import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ReciboCajaDto } from '../../model/reciboCajaDto';
import { ReciboCajaService } from '../../services/reciboCaja.service';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-anular-recibo-caja',
    templateUrl: './anular-recibo-caja.component.html',
    styleUrls: ['./anular-recibo-caja.component.scss'],
})
export class AnularReciboCajaComponent implements OnInit, OnChanges {
    formAnulaRecib: FormGroup;
    token: TokenDto;

    @Input() reciboSeleccionado: ReciboCajaDto; //*Recibe los datos de la tabla
    reciboeditTable: ReciboCajaDto;

    @Input() display: boolean = false;
    @Output() closeModal = new EventEmitter();

    estadoRecibo: any[] = [
        { name: 'Anulada', value: 0 },
    ];

    response: ResponseGenerico
    constructor(
        private reciboCajaService: ReciboCajaService,
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([{ label: 'Anulacion Recibo' }]);
    }

    ngOnInit(): void {
        this.iniciarForms();
    }

    get f() {
        return this.formAnulaRecib.controls;
    }

    iniciarForms() {
        this.formAnulaRecib = this.formBuilder.group({
            idReciboCaja: [null],
            codRcaja: [{ value: '', disabled: true }],
            fechaRcaja: [{ value: '', disabled: true }],
            nombreConsumidorRc: [{ value: '', disabled: true },],
            idEstadoRc: ['', Validators.required],
            observacionRc: ['', Validators.required],
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        this.deshabilitarCampos();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.reciboSeleccionado && this.reciboSeleccionado) {
            this.formAnulaRecib.patchValue({
                codRcaja: this.reciboSeleccionado.codRcaja,
                fechaRcaja: this.reciboSeleccionado.fechaRcaja,
                nombreConsumidorRc: this.reciboSeleccionado.nombreConsumidorRc,
                idEstadoRc: this.reciboSeleccionado.idEstadoRc,
                observacionRc: this.reciboSeleccionado.observacionRc
            });
        }
    }

    //* Funcion para dehabilitar campos del form
    deshabilitarCampos() {
        const camposDeshabilitar = ['codRcaja', 'fechaRcaja', 'nombreConsumidorRc'];
        camposDeshabilitar.some((campos) => {
            this.formAnulaRecib.get(campos).disable();
        });
    }

    //* Función para guardar el motivo de anulacion desde la tabla
    guardarMotivoAnulacion() {
        if (this.formAnulaRecib.invalid) {
            this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
            return
        } else {

            this.reciboSeleccionado.idEstadoRc = this.f.idEstadoRc.value;
            this.reciboSeleccionado.observacionRc = this.f.observacionRc.value;

            if (this.formAnulaRecib.value.estado) {
                this.reciboSeleccionado.idEstadoRc = 1; //*Pagada = 1
            } else {
                this.reciboSeleccionado.idEstadoRc = 0; //*Anulada = 0
            }

            this.reciboCajaService.saveObject(this.reciboSeleccionado).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.reciboSeleccionado.idReciboCaja) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }
                        this.setearForm();
                        //this.llenarListBancos();
                        this.CloseModal()
                    }
                },
                complete: () => {
                },
                error: error => {
                }
            })
        }
    }

    setearForm() {
        this.formAnulaRecib.reset();
        this.iniciarForms();
        this.reciboSeleccionado = null;
    }

    cancelar() {
        this.CloseModal();
        /* this.f.estadoCompr.disable();
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada');
        this.display = false; */
    }

    cerrar() {
        /*  this.f.estadoCompr.disable();
        this.formEstadoFact.reset();
        this.iniciarForms();
        this.display = false; */
    }
    onDisplayForm() {
        this.display = true;
        console.log('abriendo modal');
    }

    CloseModal() {
        this.closeModal.emit();
        console.log('cerrando modal');
        //this.formAnulaRecib.reset(); //!Activar déspues
    }
}
