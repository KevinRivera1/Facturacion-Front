import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormUtil } from '../../formUtil/FormUtil';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { DetalleFacturaService } from '../../services/detalleFactura.service';

@Component({
    selector: 'app-buscar-facturas',
    templateUrl: './buscar-facturas.component.html',
    styleUrls: ['./buscar-facturas.component.scss'],
})
export class BuscarFacturasComponent implements OnInit {
    @Output() facturaEmitter = new EventEmitter();
    facturas: FacturaDto[];

    response: ResponseGenerico;
    token: TokenDto;
    buscarForm: FormGroup;
    formUtil: FormUtil;

    constructor(
        public appService: AppService,
        private detallefacturaService: DetalleFacturaService,
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
            idFactura: [null],
            codFactura: ['', [Validators.pattern(/^\d{3}-\d{3}-\d{5}$/)]],
            nombreConsumidor: ['', Validators.pattern('^[a-zA-ZÀ-ÿ ]*$')],
            rucConsumidor: ['', [Validators.pattern('^[0-9]{1,13}$')]]
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        //this.f.idUsuarioEstComprob.setValue(this.token.id)
    }

    //* Funciones para filtrado de datos de recibos
    filtrarFacturas() {
        const formData = this.buscarForm.value;
        this.detallefacturaService.getAll().subscribe({
            next: (response) => {
                const facturasFiltrados = this.filtrarRecibosPorCriterios(response.listado, formData);
                console.log('Recibos filtrados', facturasFiltrados);
                if (facturasFiltrados.length > 0) {
                    this.facturaEmitter.emit(facturasFiltrados);
                    this.appService.msgInfoDetail(
                        severities.INFO,
                        'INFO',
                        'Datos Cargados exitosamente',
                        550
                    );

                } else {
                    console.log('no hay datos')
                    this.appService.msgInfoDetail(
                        severities.ERROR,
                        'INFO',
                        'No se encontraron registros',
                        700
                    );
                }
            },
            error: (error) => {
                console.error('Error al cargar los datos', error);
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR AL CARGAR LOS DATOS', error.error);
            },
            complete: () => {
                console.log('Obtención de datos completada');
            },
        });
    }

    filtrarRecibosPorCriterios(facturas, formData) {
        return facturas.filter((factura) => {
            const codFacturaMatch = this.matchFilter(factura.idFacturaDTO.codFactura, formData.codFactura);
            const nombreConsumidorMatch = this.matchFilter(factura.idFacturaDTO.nombreConsumidor, formData.nombreConsumidor);
            const rucConsumidorMatch = this.matchFilter(factura.idFacturaDTO.rucConsumidor, formData.rucConsumidor);

            return codFacturaMatch && nombreConsumidorMatch && rucConsumidorMatch;
        });
    }

    matchFilter(value, filter) {
        if (filter === '') {
            return true;
        }
        return value && value.includes(filter);
    }

 
    //* Termina funciones de filtrado

    setearForm() {
        this.buscarForm.reset();
        this.iniciarForms();
    }

    onInputNroFactura(event: any) {
        const input = event.target;
        const value = input.value.replace(/[^0-9]/g, '');

        const groups = [
            value.slice(0, 3),
            value.slice(3, 6),
            value.slice(6, 11),
        ].filter(Boolean);
        const formattedValue = groups.join('-');

        input.value = formattedValue;
        this.f.codFactura.setValue(formattedValue);

        const cursorPosition = input.selectionStart;
        input.setSelectionRange(cursorPosition, cursorPosition);
    }

    preventNumbers(event: KeyboardEvent) {
        this.formUtil.preventNumbers(event);
    }

    maxLengthNombre(event: Event) {
        this.formUtil.limitInputLength(event, 30, 'nombreConsumidor');
    }

    maxiLengthRuc(event: Event) {
        this.formUtil.limitInputLength(event, 13, 'rucConsumidor');
    }
}
