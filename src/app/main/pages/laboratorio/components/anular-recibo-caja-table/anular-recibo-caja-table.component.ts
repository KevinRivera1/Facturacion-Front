import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppService } from 'src/app/_service/app.service';
import { FileService } from 'src/app/_service/utils/file.service';
import { Table } from 'primeng/table';
import { ReciboCaja } from '../../model/reciboCaja';
//import { AnularReciboCajaComponent } from '../anular-recibo-caja/anular-recibo-caja.component';

@Component({
    selector: 'app-anular-recibo-caja-table',
    templateUrl: './anular-recibo-caja-table.component.html',
    styleUrls: ['./anular-recibo-caja-table.component.scss'],
})
export class AnularReciboCajaTableComponent implements OnInit {
    proceso: string = 'anular Recibo caja';
    displayModal: boolean = false;
    @Input() listReciboCaja: ReciboCaja[] = []; // va el ReciboCajaDto
    @Output() RecibCajaSelect = new EventEmitter();
    reciboCajaFiltrados: any[] = []; //* guarda los datos filtrados del componete hijo

    //recibosCaja: ReciboCajaDto;
    //selectedRecibosCaja: ReciboCajaDto[];

    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
    cols: any[];

    constructor(
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {}

    //TODO: MODIFICAR LOS CAMPOS PARA EL RECIBO CAJA ANULAR
    construirTabla() {
        this.cols = [
            //{ field: 'idReciboCaja', header: 'Nro.RECIBO' },
            { field: 'NroReciboCaja', header: 'Nro.RECIBO' },
            { field: 'nombreCliente', header: 'NOMBRE.' },
            { field: 'Ruc', header: 'Ruc.' },
            { field: 'fechaRecibo', header: 'FECHA.' },
            { field: 'totalRecibo', header: 'TOTAL' },
            { field: 'estadoRecibo', header: 'ESTADO' },
            { field: 'motivoRecibo', header: 'MOTIVO' },
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

    //* funcion para dovolver los datos filtrados
    FilterData(data: any) {}

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

    modalOpen() {
        //this.displayAnulacioModal.onDisplayForm()
        this.displayModal = true;
        console.log('abrir modal desde tabla');
    }

    closeModal() {
        this.displayModal = false;
        console.log('cerrando modal');
    }
}
