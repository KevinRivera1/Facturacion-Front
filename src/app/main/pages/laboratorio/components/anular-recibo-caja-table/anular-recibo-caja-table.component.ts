import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppService } from 'src/app/_service/app.service';
import { FileService } from 'src/app/_service/utils/file.service';
import { Table } from 'primeng/table';
import { ReciboCajaDto } from '../../model/reciboCajaDto';
import { ReciboCajaService } from '../../services/reciboCaja.service';

//import { AnularReciboCajaComponent } from '../anular-recibo-caja/anular-recibo-caja.component';

@Component({
    selector: 'app-anular-recibo-caja-table',
    templateUrl: './anular-recibo-caja-table.component.html',
    styleUrls: ['./anular-recibo-caja-table.component.scss'],
})
export class AnularReciboCajaTableComponent implements OnInit {
    proceso: string = 'anular Recibo caja';
    displayModal: boolean = false;

    @Input() listReciboCaja: ReciboCajaDto[] = []; // va el ReciboCajaDto
    @Output() RecibCajaSelect = new EventEmitter();

    reciboCajaFiltrados: any[] = []; //* resive y guarda los datos filtrados del componete hijo buscarcomponent

    //recibosCaja: ReciboCajaDto;
    selectedRecibosCaja: ReciboCajaDto[];

    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
    cols: any[];

    constructor(
        private reciboCajaService: ReciboCajaService,
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.construirTabla();
    }

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

    //* funcion para dovolver los datos filtrados y mostrarlos en la tabla
    FilterData(data:any) {
        this.reciboCajaService.getAll(data).subscribe({
            next: (resultadoData: any[]) => {
                this.reciboCajaFiltrados = resultadoData;
                console.log("🚀 ~ file: anular-recibo-caja-table.component.ts:72 ~ AnularReciboCajaTableComponent ~ this.reciboCajaService.getAll ~ reciboCajaFiltrados:", this.reciboCajaFiltrados)
            },
            error: (error: any) => {
                console.log('Error al obtener los datos filtrados', error);
            },
        });
    }

    //* Función para guardar el motivo de anulacion desde la tabla
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
