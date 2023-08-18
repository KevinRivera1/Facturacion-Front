import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormUtil } from '../../formUtil/FormUtil';
import { ReciboCajaDto } from '../../model/reciboCajaDto';
import { ReciboCajaService } from '../../services/reciboCaja.service';

@Component({
    selector: 'app-buscar-recibos',
    templateUrl: './buscar-recibos.component.html',
    styleUrls: ['./buscar-recibos.component.scss'],
})
export class BuscarRecibosComponent implements OnInit {
    @Output() reciboCajaEmitter = new EventEmitter();
    recibos: ReciboCajaDto[];

    proceso: string = 'anular recibos caja';
    response: ResponseGenerico;
    token: TokenDto;
    buscarForm: FormGroup;
    formUtil: FormUtil;

    constructor(
        public appService: AppService,
        private reciboCajaService: ReciboCajaService,
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
            idReciboCaja: [null],
            codRcaja: ['', [Validators.pattern(/^\d{3}-\d{3}-\d{5}$/)]],
            nombreConsumidorRc: ['', Validators.pattern('^[a-zA-ZÀ-ÿ ]*$')],
            rucConsumidorRc: ['', [Validators.pattern('^[0-9]{1,13}$')]],
            Cedula: ['', [Validators.pattern('^[0-9]{1,10}$')]],
            fechaDesde: [''],
            fechaHasta: [''],
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        //this.f.idUsuarioEstComprob.setValue(this.token.id)
    }

    async filtrarRecibos() {
        const formData = this.buscarForm.value;
        await this.reciboCajaService.getAll().subscribe({
            next: (response) => {
                const data = response.listado;
                if (Array.isArray(data)) {
                    const recibosFiltrados = data.filter((recibo) => {
                        const fecharecibo = recibo.fechaRcaja;

                        //169221463298
                        console.log('Fechas del Recibo: ', fecharecibo);
                        console.log('Fechas del Formulario: ', formData.fechaDesde, formData.fechaHasta);

                        const cumplefiltrosFecha = this.filtarRangoFechas(fecharecibo, formData.fechaDesde, formData.fechaHasta);
                        console.log('cumple filtro de fechas: ', cumplefiltrosFecha);

                        return (
                            recibo.codRcaja.includes(formData.codRcaja) &&
                            recibo.nombreConsumidorRc.includes(
                                formData.nombreConsumidorRc
                            ) &&
                            recibo.rucConsumidorRc.includes(
                                formData.rucConsumidorRc
                            ) && this.filtarRangoFechas(fecharecibo, formData.fechaDesde, formData.fechaHasta)
                        );
                    });
                    console.log('Recibos filtrados', recibosFiltrados);
                    this.reciboCajaEmitter.emit(recibosFiltrados);
                } else {
                    console.error(
                        'Los datos no son un array verifca el tipo de dato que es DATA:',
                        data
                    );
                }
            },
            error: (error) => {
                this.appService.msgInfoDetail(
                    severities.ERROR,
                    'ERROR AL CARGAR LOS DATOS',
                    error.error
                );
            },
            complete: () => {
                console.log('Obtención de datos completada');
                this.setearForm();
            },
        });
    }

    filtarRangoFechas(fechaRecibo: any, fechaDesde: string, fechaHasta: string): boolean {
        if (!fechaDesde && !fechaHasta) {
            return true;
        }
        const fechaReciboT = fechaRecibo;
        const fechaDesdeT = fechaDesde ? new Date(fechaDesde).getTime() : 0;
        const fechaHastaT = fechaHasta ? new Date(fechaHasta).getTime() + 86400000 : Number.MAX_SAFE_INTEGER;

        return fechaReciboT >= fechaDesdeT && fechaReciboT <= fechaHastaT;
    }

    setearForm() {
        this.buscarForm.reset();
        this.iniciarForms();
    }

    onInputNroRecibo(event: any) {
        const input = event.target;
        const value = input.value.replace(/[^0-9]/g, '');

        const groups = [
            value.slice(0, 3),
            value.slice(3, 6),
            value.slice(6, 11),
        ].filter(Boolean);
        const formattedValue = groups.join('-');

        input.value = formattedValue;
        this.f.codRcaja.setValue(formattedValue);

        const cursorPosition = input.selectionStart;
        input.setSelectionRange(cursorPosition, cursorPosition);
    }

    preventNumbers(event: KeyboardEvent) {
        this.formUtil.preventNumbers(event);
    }

    maxLengthNombre(event: Event) {
        this.formUtil.limitInputLength(event, 30, 'nombreConsumidorRc');
    }
    maxLengthCedula(event: Event) {
        this.formUtil.limitInputLength(event, 10, 'Cedula');
    }

    maxiLengthRuc(event: Event) {
        this.formUtil.limitInputLength(event, 13, 'rucConsumidorRc');
    }
}
