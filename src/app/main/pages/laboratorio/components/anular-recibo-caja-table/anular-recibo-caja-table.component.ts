import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppService } from 'src/app/_service/app.service';
import { FileService } from 'src/app/_service/utils/file.service';
import { Table } from 'primeng/table';
import { ReciboCaja } from '../../model/reciboCaja';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-anular-recibo-caja-table',
    templateUrl: './anular-recibo-caja-table.component.html',
    styleUrls: ['./anular-recibo-caja-table.component.scss'],
})
export class AnularReciboCajaTableComponent implements OnInit {
    proceso: string = 'anular Recibo caja';
    @Input() listReciboCaja: ReciboCaja[]; // va el ReciboCajaDto
    @Output() RecibCajaSelect = new EventEmitter();
    @Input() display: boolean;
    //recibosCaja: ReciboCajaDto;
    //selectedRecibosCaja: ReciboCajaDto[];

    formAnulaRecib: FormGroup;
    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
    cols: any[];

    //? Aqui se define la lista de estados del modal de anular
    estados: any[] = [{ name: 'Anulada', value: 'Anulada' }];

    constructor(
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {}

    //TODO: MODIFICAR LOS CAMPOS PARA EL RECIBO CAJA ANULAR
    construirTabla() {
        this.cols = [
            { field: 'idRecibCaja', header: 'Nro.' },
            { field: 'nombreBancos', header: 'NOMBRE.' },
            { field: 'descBancos', header: 'DETALLE.' },
            { field: 'estadoBancos', header: 'ESTADO.' },
        ];
        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    guardarMotivoAnulacion() {}
    exportPdf() {
        /* let indexLista: number = 0;
    this.listFormaPago.forEach((element) => {
        indexLista++;
        element.idFormaPago = indexLista;
        //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
    });
    this.appservie.exportPdf(
        this.exportColumns,
        this.listFormaPago,
        'Forma pago',
        'p'
    ); */
    }

    exportExcel() {
        /* let indexLista: number = 0;
    this.listFormaPago.forEach((element) => {
        indexLista++;
        element.idFormaPago = indexLista;

        element.formatDate =
            new Date(element.fechaFp).toLocaleDateString() +
            ' ' +
            new Date(element.fechaFp).toLocaleTimeString();
    });
    this.appservie.exportExcel(this.listFormaPago, 'Forma Pago'); */
    }

    descargarArchivo(fileName: string) {
        /*   try {
        this.fileService.getFileByName(fileName, this.proceso);
    } catch (error) {
        this.appservie.msgInfoDetail(
            'error',
            'Error',
            'Error al descargar el archivo'
        );
    } */
    }

    cancelar() {
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
}
