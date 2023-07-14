import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ResponseGenerico } from '../../../../../_dto/response-generico';
import { EstadoFacturaDto } from '../../model/EstadoFacturaDto';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

import { TokenDto } from 'src/app/_dto/token-dto';
import { severities } from 'src/app/_enums/constDomain';
import { EstadoFacturaService } from '../../services/estadoFactura.service';

@Component({
    selector: 'app-estado-factura',
    templateUrl: './estado-factura.component.html',
    styleUrls: ['./estado-factura.component.scss'],
})
export class EstadoFacturaComponent implements OnInit {

    proceso: string = 'estadosFact';
    @Input() estadoFact: EstadoFacturaDto;

    formEstadoFact: FormGroup;

    listEstadoFact: EstadoFacturaDto[] = [];

    response: ResponseGenerico;

    token: TokenDto;

    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,

        private estadoFacteService: EstadoFacturaService
    ) {
        this.breadcrumbService.setItems([{ label: 'Estado Factura' }]);
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
            idEstadoComprobante: new FormControl(null),
            nombreEstadoComp: new FormControl(
                '',
                Validators.compose([Validators.required])
                ),
                detalleEstadoComp: new FormControl(
                    '',
                    Validators.compose([Validators.required])
                    ),
                });
                
                
                this.token = JSON.parse(this.tokenService.getResponseAuth());
                //  this.f.idEstadoComprobante.setValue(this.token.id)
            }
            

    setSeleccionado(obj) {
        this.estadoFact = obj;
        this.formEstadoFact = this.formBuilder.group(this.estadoFact);
        console.log('EMITI', this.estadoFact);
    }

    async llenarListEstadoFact() {
        await this.estadoFacteService.getAll().subscribe({
            next: (data) => {
                this.listEstadoFact = data.listado;
                console.log('CORRECTO');
                console.log(this.listEstadoFact);
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

            this.estadoFact.nombreEstadoComp = this.f.nombreEstadoComp.value;
            this.estadoFact.detalleEstadoComp = this.f.detalleEstadoComp.value;
            //this.estadoFact.idEstadoComprobante = 1;

            this.estadoFacteService.saveObject(this.estadoFact).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.estadoFact.idEstadoComprobante) {
                            this.appService.msgCreate();
                        } else {
                            this.appService.msgUpdate();
                        }
                        this.setearForm();
                        this.llenarListEstadoFact();
                    }
                },
                complete: () => {},
                error: (error) => {},
            });
        }
    }

    setearForm() {
        this.formEstadoFact.reset();
        this.iniciarForms();
        this.estadoFact = null;
    }

    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada');
    }
}
