import { Component, Input, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { EstadoComprobanteDto } from '../../model/EstadoComprobanteDto';
import { EstadoComprobanteService } from '../../services/estadoComprobante.service';

@Component({
    selector: 'app-estado-comprobante',
    templateUrl: './estado-comprobante.component.html',
    styleUrls: ['./estado-comprobante.component.scss'],
})
export class EstadoComprobanteComponent implements OnInit {
    proceso: string = 'estadosFact';
    @Input() display: boolean;
    @Input() estadoFact: EstadoComprobanteDto;

    formEstadoFact: FormGroup;

    listEstadoFact: EstadoComprobanteDto[] = [];

    response: ResponseGenerico;

    token: TokenDto;

    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,

        private estadoComprobanteService: EstadoComprobanteService
    ) {
        this.breadcrumbService.setItems([{ label: 'Estado Comprobante' }]);
    }

    ngOnInit(): void {
        this.iniciarForms();
        this.llenarListEstadoFact();
    }

    get f() {
        return this.formEstadoFact.controls;
    }

    iniciarForms() {
        this.formEstadoFact = this.formBuilder.group({
            idEstadoComprobante: [null],
            nombreEstadoComp: ['', Validators.required],
            detalleEstadoComp: ['', Validators.required],
            estadoCompr: [true, Validators.requiredTrue],
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        //this.f.idUsuarioEstComprob.setValue(this.token.id)
    }

    setSeleccionado(obj) {
        this.f.estadoCompr.enable();
        this.estadoFact = obj;
        this.formEstadoFact = this.formBuilder.group(this.estadoFact);
        this.f.estadoCompr.setValue(this.estadoFact.estadoCompr === 'ACTIVO');
        console.log('EMITI', this.estadoFact);
    }

    async llenarListEstadoFact() {
        await this.estadoComprobanteService.getAll().subscribe({
            next: (data) => {
                this.listEstadoFact = data.listado;
                console.log('CORRECTO');
                console.log(this.listEstadoFact);
            },
            complete: () => {
                this.appService.msgInfoDetail(
                    severities.INFO,
                    'INFO',
                    'Datos Cargados exitosamente',
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

    guardarEstadoFact() {
        if (this.formEstadoFact.invalid) {
            this.appService.msgInfoDetail(
                'warn',
                'Verificación',
                'Verificar los Datos a Ingresar'
            );
            return;
        } else {
            this.estadoFact = this.formEstadoFact.value;
            this.estadoFact.nombreEstadoComp =
                this.f.nombreEstadoComp.value.toUpperCase();
            this.estadoFact.detalleEstadoComp =
                this.f.detalleEstadoComp.value.toUpperCase();
            //this.estadoFact.idEstadoComprobante = 1;

            //Este asigna el ID del usuario logeado al guardar un registro
            this.estadoFact.idUsuarioEstComprob = this.token.id;

            this.estadoFact.nombreEstadoComp = this.formEstadoFact.value
                .nombreEstadoComp
                ? this.estadoFact.nombreEstadoComp
                : 'PENDIENTE';

            this.estadoFact.estadoCompr = this.formEstadoFact.value.estadoCompr
                ? 'ACTIVO'
                : 'INACTIVO';

            /*  if (this.formEstadoFact.value.nombreEstadoComp) {
                //this.estadoFact.nombreEstadoComp = 'PAGADA';
                this.estadoFact.nombreEstadoComp =
                    this.estadoFact.nombreEstadoComp;
            } else {
                this.estadoFact.nombreEstadoComp = 'PENDIENTE';
            }

            if (this.formEstadoFact.value.estadoCompr) {
                this.estadoFact.estadoCompr = 'ACTIVO';
            } else {
                this.estadoFact.estadoCompr = 'INACTIVO';
            } */

            //Comprueba si el registro ya existe en base a los parametros proporcionados en la función registroExiste.
            if (
                this.registroExiste(
                    this.estadoFact.detalleEstadoComp,
                    this.estadoFact.idEstadoComprobante
                )
            ) {
                this.appService.msgInfoDetail(
                    'warn',
                    'Registro Duplicado',
                    'Este registro ya existe'
                );
                return;
            }

            this.estadoComprobanteService
                .saveObject(this.estadoFact)
                .subscribe({
                    next: (data) => {
                        this.response = data;
                        if (this.response.codigoRespuestaValue == 200) {
                            if (!this.estadoFact.idEstadoComprobante) {
                                this.appService.msgCreate();
                                this.display = false;
                            } else {
                                this.appService.msgUpdate();
                                this.display = false;
                            }
                            this.setearForm();
                            this.llenarListEstadoFact();
                        }
                    },
                    complete: () => {},
                    error: (error) => {
                        console.error(
                            'Ocurrió un error al guardar un registro: ',
                            error
                        );
                    },
                });
        }
    }

    //Este verifica si un Registro existe mediante el detalleEstado pero con un ID diferente
    registroExiste(
        detalleEstadoComp: string,
        idEstadoComprobante: number
    ): boolean {
        return this.listEstadoFact.some(
            (estado) =>
                estado.detalleEstadoComp === detalleEstadoComp &&
                estado.idEstadoComprobante !== idEstadoComprobante
        );
    }

    setearForm() {
        this.formEstadoFact.reset();
        this.iniciarForms();
        this.estadoFact = null;
    }

    cancelar() {
        this.f.estadoCompr.disable();
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada');
        this.display = false;
    }

    cerrar() {
        this.f.estadoCompr.disable();
        this.formEstadoFact.reset();
        this.iniciarForms();
        this.display = false;
    }

    onDisplayForm() {
        this.display = true;
        console.log('abriendo modal');
    }
}
