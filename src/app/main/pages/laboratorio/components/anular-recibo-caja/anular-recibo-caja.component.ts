import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenDto } from 'src/app/_dto/token-dto';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
    selector: 'app-anular-recibo-caja',
    templateUrl: './anular-recibo-caja.component.html',
    styleUrls: ['./anular-recibo-caja.component.scss'],
})
export class AnularReciboCajaComponent implements OnInit {
    formAnulaRecib: FormGroup;
    token: TokenDto;
    @Input() display: boolean = false;
    @Output() closeModal = new EventEmitter();
    //? Aqui se define la lista de estados del modal de anular
    estados: any[] = [{ name: 'Anulada', value: 'Anulada' }];

    constructor(
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
            RecibCajaNo: [{ value: '001-003-58509', disabled: true }],
            fecha: [{ value: '31/15/2023', disabled: true }], //! Dato Quemado
            cliente: [
                { value: 'BONILLA ZALAZAR CARLOS MARCELO', disabled: true },
            ], //! Dato Quemado
            estadoRecib: ['', Validators.required],
            detalleAnulacion: ['', Validators.required],
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        this.deshabilitarCampos();
        //! deshabilitar inputs de entrada
        //this.formAnulaRecib.get('RecibCajaNo').disable();
        //this.formAnulaRecib.get('fecha').disable();
        //this.formAnulaRecib.get('cliente').disable();
    }

    //* Funcion para dehabilitar campos del form
    deshabilitarCampos() {
        const camposDeshabilitar = ['RecibCajaNo', 'fecha', 'cliente'];
        camposDeshabilitar.some((campos) => {
            this.formAnulaRecib.get(campos).disable();
        });
    }

    guardarMotivoAnulacion() {}

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
