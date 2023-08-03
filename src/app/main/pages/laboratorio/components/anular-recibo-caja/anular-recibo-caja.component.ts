import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ReciboCaja } from '../../model/reciboCaja';

@Component({
    selector: 'app-anular-recibo-caja',
    templateUrl: './anular-recibo-caja.component.html',
    styleUrls: ['./anular-recibo-caja.component.scss'],
})
export class AnularReciboCajaComponent implements OnInit {
    @Input() reciboCaja: ReciboCaja; //Va reciboDTo
    reciboCajaFiltrados: ReciboCaja; //va ReciboDto

    proceso: string = 'anular recibos caja';
    response: ResponseGenerico;
    token: TokenDto;
    anularRecibCajaForm: FormGroup;
    maxLength: number = 10;
    maxLengthRuc: number = 13;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService
    ) {
        {
            this.breadcrumbService.setItems([{ label: 'Anular Recibo Caja' }]);
        }
    }

    ngOnInit() {
        this.iniciarForms();
    }

    get f() {
        return this.anularRecibCajaForm.controls;
    }

    iniciarForms() {
        this.anularRecibCajaForm = this.formBuilder.group({
            //idEstadoComprobante: [null],
            NroReciboCaja: ['', Validators.required],
            NombreCliente: ['', Validators.required],
            Ruc: ['',[Validators.required, Validators.pattern('^[0-9]{1,10}$')],],
            Cedula: ['',[Validators.required, Validators.pattern('^[0-9]{1,10}$')],],
            fechaDesde: ['', Validators.required],
            fechaHasta: ['', Validators.required],
            //estadoCompr: [true, Validators.requiredTrue],
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        //this.f.idUsuarioEstComprob.setValue(this.token.id)
    }

    obtenerdaData() {}

    Buscar() {
        const fechaDesde = this.anularRecibCajaForm.value.fechaDesde;
        const fechaHasta = this.anularRecibCajaForm.value.fechaDesde;
        console.log('filtrando info: ' + fechaDesde);
        console.log('filtrando info  hasta: ' + fechaHasta);

        /*  this.reciboCaja = this.reciboCaja.filter((recibo) => {
            const fechaRecibo = new Date(recibo.fecha);
            return fechaRecibo >= fechaDesde && fechaRecibo <= fechaHasta;
        }); */
    }
    
    onInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        if (value.length > this.maxLength) {
            inputElement.value = value.slice(0, this.maxLength);
            this.anularRecibCajaForm.controls['Cedula'].setValue(
                inputElement.value
            );
        }
    }
    onInputRuc(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        if (value.length > this.maxLengthRuc) {
            inputElement.value = value.slice(0, this.maxLengthRuc);
            this.anularRecibCajaForm.controls['Ruc'].setValue(
                inputElement.value
            );
        }
    }
}
