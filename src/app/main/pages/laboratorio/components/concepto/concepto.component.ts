import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { ConceptoTcDto } from '../../model/ConceptoTc.Dto';
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
            codigoConcepto: new FormControl('00000',Validators.compose([Validators.required])),
            idTipoConceptoDto: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            idIva: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            nombreConcepto: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            descConcepto: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            valorConcepto: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            estadoConcetpto: new FormControl(
                true,
                Validators.compose([Validators.requiredTrue])
            ),
            fechaConcepto: new FormControl(new Date().toLocaleDateString()),
        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
    }

    setSeleccionado(obj) {
        this.conceptos = obj;
        this.formConceptos = this.formBuilder.group(this.conceptos);
        this.f.estadoConcetpto.setValue(
            this.conceptos.estadoConcetpto === 'ACTIVO'
        );
        this.f.fechaConcepto.setValue(
            new Date(this.conceptos.fechaConcepto).toISOString()
        );

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
                    'Datos Cargados exitosamente'
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

    private formatNumber(num: string): string {
        return `SC-${num.toString().padStart(5, '0')}`;
    }

    guardarConceptos() {
        if (this.formConceptos.invalid) {
            this.appService.msgInfoDetail(
                'warn',
                'Verificación',
                'Verificar los Datos a Ingresar'
            );
            return;
        } else {
            this.conceptos = this.formConceptos.value;
            this.conceptos.codigoConcepto = this.formatNumber(this.f.codigoConcepto.value);
            (this.conceptos.idTipoConceptoDto = {idTipoConcepto: this.f.idTipoConceptoDto.value}),
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

            // const nombreExiste = this.listConceptos.find(
            //     (nombreConcepto) =>
            //         nombreConcepto.nombreConcepto ==
            //         this.conceptos.nombreConcepto
            // );

            // const codigoExiste = this.listConceptos.find(
            //     (codigoConcepto) =>
            //         codigoConcepto.codigoConcepto ==
            //         this.conceptos.codigoConcepto
            // );

            //  }

            this.conceptosService.saveObject(this.conceptos).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.conceptos.idConcepto) {
                            // if (nombreExiste && codigoExiste) {
                            //     this.appService.msgInfoDetail(
                            //         'warn',
                            //         'registro duplicado',
                            //         'este registro ya existe con ese detalle'
                            //     );
                            //     return;
                            // }
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
        }
        this.display = false;
    }

    setearForm() {
        this.formConceptos.reset();
        this.iniciarForms();
        this.conceptos = null;
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
        this.iniciarForms();
        this.display = false;
    }
}
