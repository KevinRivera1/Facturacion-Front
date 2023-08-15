import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormUtil } from '../../formUtil/FormUtil';
import { ReciboCaja } from '../../model/reciboCaja';

@Component({
    selector: 'app-buscar-recibos',
    templateUrl: './buscar-recibos.component.html',
    styleUrls: ['./buscar-recibos.component.scss'],
})
export class BuscarRecibosComponent implements OnInit {
    @Input() reciboCaja: ReciboCaja; //Va reciboDTo
    reciboCajaFiltrados: ReciboCaja; //va ReciboDto

    proceso: string = 'anular recibos caja';
    response: ResponseGenerico;
    token: TokenDto;
    buscarForm: FormGroup;
    formUtil: FormUtil;

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
        this.formUtil = new FormUtil(this.buscarForm);
    }

    get f() {
        return this.buscarForm.controls;
    }

    iniciarForms() {
        this.buscarForm = this.formBuilder.group({
            //idEstadoComprobante: [null],
            NroReciboCaja: ['',[Validators.pattern(/^\d{3}-\d{3}-\d{5}$/),],],
            NombreCliente: ['', Validators.required],
            Ruc: ['',[Validators.pattern('^[0-9]{1,13}$')],],
            Cedula: ['',[Validators.pattern('^[0-9]{1,10}$')],],
            fechaDesde: [new Date()],
            fechaHasta: [new Date()],
            //estadoCompr: [true, Validators.requiredTrue],
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        //this.f.idUsuarioEstComprob.setValue(this.token.id)
    }

    obtenerdaData() {}

    Buscar() {
        const fechaDesde = this.buscarForm.value.fechaDesde;
        const fechaHasta = this.buscarForm.value.fechaDesde;
        console.log('filtrando info: ' + fechaDesde);
        console.log('filtrando info  hasta: ' + fechaHasta);

        /*  this.reciboCaja = this.reciboCaja.filter((recibo) => {
            const fechaRecibo = new Date(recibo.fecha);
            return fechaRecibo >= fechaDesde && fechaRecibo <= fechaHasta;
        }); */
    }

    maxLengthCedula(event: Event) {
        this.formUtil.limitInputLength(event, 10, 'Cedula');
    }

    maxiLengthRuc(event: Event) {
        this.formUtil.limitInputLength(event, 13, 'Ruc');
    }
}
