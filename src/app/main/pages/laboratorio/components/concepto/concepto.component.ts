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
    }

    get f() {
        return this.formConceptos.controls;
    }

    iniciarForms() {
        this.formConceptos = this.formBuilder.group({
            idConcepto: new FormControl(null),
            codigoConcepto: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),

            idTipoConcepto: new FormControl(null,),
            idIva: new FormControl(null,),


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
            fechaConcepto: new FormControl(
                new Date().toLocaleDateString(),
                Validators.compose([Validators.required])
            ),
        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
    }

    setSeleccionado(obj) {
        this.conceptos = obj;
        this.formConceptos = this.formBuilder.group(this.conceptos);
        this.f.estadoConcetpto.setValue(this.conceptos.estadoConcetpto === 'ACTIVO');
        this.f.fechaConcepto.setValue(
            new Date(this.conceptos.fechaConcepto).toLocaleString()
        );
        console.log('EMITI', this.conceptos);
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
            this.conceptos.codigoConcepto = this.f.codigoConcepto.value;
            this.conceptos.idTipoConcepto = 146;
            this.conceptos.idIva = 1;
            this.conceptos.nombreConcepto = this.f.nombreConcepto.value;
            this.conceptos.descConcepto = this.f.descConcepto.value;
            this.conceptos.valorConcepto = this.f.valorConcepto.value;
            this.conceptos.fechaConcepto = this.f.fechaConcepto.value;
            this.conceptos.idUsuarioConcepto = 1;

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
            //  }

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
        this.setearForm();
        this.display = false;
    }
}
