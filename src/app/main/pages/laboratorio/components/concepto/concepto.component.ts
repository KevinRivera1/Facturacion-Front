import { Component, OnInit, Input} from '@angular/core';
import { ResponseGenerico } from '../../../../../_dto/response-generico';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TokenDto } from '../../../../../_dto/token-dto';
import { AppService } from '../../../../../_service/app.service';
import { TokenService } from '../../../../../_service/token.service';
import { BreadcrumbService } from '../../../../../_service/utils/app.breadcrumb.service';
import { severities } from '../../../../../_enums/constDomain';
import { ConceptoDto } from '../../model/ConceptoDto';
import { ConceptoService } from '../../services/concepto.service';
import { IvaDto } from '../../model/IvaDto copy';
import { TipoConceptoDto } from '../../model/TipoConcepto.dto';

@Component({
    selector: 'app-concepto',
    templateUrl: './concepto.component.html',
    styleUrls: ['./concepto.component.css'],
})
export class ConceptoComponent implements OnInit {
    @Input() conceptos: ConceptoDto;

    display: boolean = false;

    proceso: string = 'conceptos';

    response: ResponseGenerico;

    formConceptos: FormGroup;

    listConceptos: ConceptoDto[] = [];

    token: TokenDto;

    @Input() listIva: IvaDto[];

    loading: boolean;

    cols: any[];

    selectedIva: IvaDto[];

    @Input() listTc: TipoConceptoDto[];

    selectedTc: TipoConceptoDto[];

    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,

        private conceptosService: ConceptoService
    ) {
        this.breadcrumbService.setItems([{ label: 'CONCEPTOS' }]);
    }

    ngOnInit(): void {
        this.iniciarForms();
        this.llenarListConceptos();
        this.llenarListIva();
        this.llenarListTc();
    }

    get f() {
        return this.formConceptos.controls;
    }

    iniciarForms() {
        this.formConceptos = this.formBuilder.group({
            idConcepto: new FormControl(null),
            codigoConcepto: new FormControl('SC-00000', [
            Validators.required,Validators.pattern(/^SC-\d{5}$/)]),
            idTipoConceptoDto: new FormControl('',Validators.compose([Validators.required])),
            idIva: new FormControl('',Validators.compose([Validators.required])),
            nombreConcepto: new FormControl('',Validators.compose([Validators.required])),
            descConcepto: new FormControl('',Validators.compose([Validators.required])),
            valorConcepto: new FormControl('',Validators.compose([Validators.required])),
            estadoConcetpto: new FormControl(true,Validators.compose([Validators.requiredTrue])),
            fechaConcepto: new FormControl(new Date().toLocaleDateString()),
        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
    }

    setSeleccionado(obj) {
        this.f.estadoConcetpto.enable();
        this.conceptos = obj;
        this.formConceptos = this.formBuilder.group(this.conceptos);
        this.f.estadoConcetpto.setValue(
            this.conceptos.estadoConcetpto === 'ACTIVO'
        );
        // this.f.fechaConcepto.setValue(
        //     new Date(this.conceptos.fechaConcepto).toISOString()
        // );

        this.f.idTipoConceptoDto.setValue(
            this.conceptos.idTipoConceptoDto.idTipoConcepto
        );

        console.log('EMITI', this.conceptos);
    }


    loadData(event) {
        this.loading = true;
        setTimeout(() => {
            this.conceptosService.getIva().subscribe((res) => {
                this.listIva = res;
                console.log('LLAMADA');
                console.log(this.listIva);
                this.loading = false;
            });
        }, 1000);
    }

    loadData1(event) {
        this.loading = true;
        setTimeout(() => {
            this.conceptosService.getTc().subscribe((res) => {
                this.listTc = res;
                console.log('LLAMADA');
                console.log(this.listTc);
                this.loading = false;
            });
        }, 1000);
    }

    async llenarListConceptos() {
        await this.conceptosService.getAll().subscribe({
            next: (data) => {
                this.listConceptos = data.listado;
                console.log('CORRECTO');
                console.log(this.listConceptos);
            },
            complete: () => {
                this.appService.msgInfoDetail(
                    severities.INFO,
                    'INFO',
                    'Datos Cargados exitosamente' ,
                    500
                );
            },
            error: (error) => {
                this.appService.msgInfoDetail(
                    severities.ERROR,
                    'ERROR',
                    error.error
                );
            },
        });
    }

    async llenarListIva() {
        await this.conceptosService.getIva().subscribe({
            next: (data) => {
                this.listIva = data.listado;
                console.log('CORRECTO');
                console.log(this.listIva);
            },
            complete: () => {
                //this.appService.msgInfoDetail(severities.INFO,'INFO','Datos Cargados exitosamente');
            },
            error: (error) => {
                this.appService.msgInfoDetail(
                    severities.ERROR,
                    'ERROR',
                    error.error
                );
            },
        });
    }
    async llenarListTc() {
        await this.conceptosService.getTc().subscribe({
            next: (data) => {
                this.listTc = data.listado;
                console.log('CORRECTO');
                console.log(this.listTc);
            },
            complete: () => {
                //this.appService.msgInfoDetail(severities.INFO,'INFO','Datos Cargados exitosamente');
            },
            error: (error) => {
                this.appService.msgInfoDetail(
                    severities.ERROR,
                    'ERROR',
                    error.error
                );
            },
        });
    }



    onCodConceptoInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const numericValue = inputElement.value.replace(/\D/g, '');
        inputElement.value = `SC-${numericValue}`;
        this.formConceptos.controls['codigoConcepto'].setValue(inputElement.value);
      }

    guardarConceptos() {
        if (this.formConceptos.invalid) {
            let mensajes = [];
        if (this.f.descConcepto.invalid || this.f.nombreConcepto.invalid) {
          mensajes.push('Faltan Campos por llenar.');
        }
        if (this.f.codigoConcepto.invalid) {
            mensajes.push('El campo Codigo debe contener 5 digitos numericos.');
        }
        if (mensajes.length > 0) {
          this.appService.msgInfoDetail('warn', 'ALERTA', mensajes.join(' '));
          return;
        }
      } 
            this.conceptos = this.formConceptos.value;
            this.conceptos.codigoConcepto = this.f.codigoConcepto.value;
            (this.conceptos.idTipoConceptoDto = {idTipoConcepto: this.f.idTipoConceptoDto.value,}),
            (this.conceptos.idIva = this.f.idIva.value);
            this.conceptos.nombreConcepto = this.f.nombreConcepto.value;
            this.conceptos.descConcepto = this.f.descConcepto.value;
            this.conceptos.valorConcepto = this.f.valorConcepto.value;
            this.conceptos.estadoConcetpto = this.f.estadoConcetpto.value;
            //this.conceptos.fechaConcepto = this.f.fechaConcepto.value;

            this.conceptos.idUsuarioConcepto = this.token.id;

            if (this.conceptos.idConcepto != null) {
                this.conceptos.fechaConcepto = new Date(
                    this.conceptos.fechaConcepto
                );
            } else {
                this.conceptos.fechaConcepto = new Date();
            }

            if (this.formConceptos.value.estadoConcetpto) {
                this.conceptos.estadoConcetpto = 'ACTIVO';
            } else {
                this.conceptos.estadoConcetpto = 'INACTIVO';
            }


            const nombreConcepto = this.f.nombreConcepto.value;
            const codigoConcepto = this.f.codigoConcepto.value;

            if (
                this.existeRegistro(
                    nombreConcepto,
                    codigoConcepto,
                    this.conceptos.idConcepto
                )
            ) {
                this.appService.msgInfoDetail(
                    'warn',
                    'Registro Duplicado',
                    'Este registro ya existe'
                );
                return;
            }

            this.conceptosService.saveObject(this.conceptos).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.conceptos.idConcepto) {
                            this.appService.msgCreate();
                        } else {
                            this.appService.msgUpdate();
                        }

                        this.setearForm();
                        this.llenarListConceptos();
                    }
                },
                complete: () => {},
                error: (error) => {},
            });
        
        this.display = false;
    }

    setearForm() {
        this.formConceptos.reset();
        this.iniciarForms();
        this.conceptos = null;
    }

    private existeRegistro(
        nombreConcepto: string,
        codigoConcepto: string,
        idConcepto: number
    ): boolean {
        // Estamos en modo creación o edición, realizamos la validación de duplicados.
        return this.listConceptos.some(
            (concepto) =>
                (concepto.nombreConcepto === nombreConcepto ||
                    concepto.codigoConcepto === codigoConcepto) &&
                concepto.idConcepto !== idConcepto
        );
    }

    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada');
        this.display = false;
    }
    closeModal() {
        this.display = false;
    }

    abrirmodal() {
        this.display = true;
    }
    cerrar() {
        this.formConceptos.reset();
        this.f.estadoConcetpto.disable();
        this.iniciarForms();
        this.display = false;
    }
}
