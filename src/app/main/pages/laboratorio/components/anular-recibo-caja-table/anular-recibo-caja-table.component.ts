import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { FileService } from 'src/app/_service/utils/file.service';
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

    @Input() recibos: any[] = [];

    //*Tabal emite dato para actualizar etado
    @Output() estadoRecibSelect = new EventEmitter();

    recibosCaja: ReciboCajaDto;

    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
    cols: any[];

    constructor(
        private reciboCajaService: ReciboCajaService,
        private fileService: FileService,
        private appService: AppService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.construirTabla();
    }

    //TODO: MODIFICAR LOS CAMPOS PARA EL RECIBO CAJA ANULAR
    construirTabla() {
        this.cols = [
            //{ field: 'idReciboCaja', header: 'Nro.RECIBO' },
            { field: 'codRcaja', header: 'Nro.RECIBO' },
            { field: 'nombreConsumidorRc', header: 'NOMBRE.' },
            { field: 'rucConsumidorRc', header: 'Ruc.' },
            { field: 'fechaRcaja', header: 'FECHA.' },
            { field: 'totalRc', header: 'TOTAL' },
            { field: 'idEstadoRc', header: 'ESTADO' },
            { field: 'observacionRc', header: 'MOTIVO' },
        ];
        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
        this.recibos = [];
    }

    filtrarRecibos(recibos: any[]) {
        this.recibos = recibos;
        this.appService.msgInfoDetail(
            severities.INFO,
            'INFO',
            'Datos Cargados exitosamente',
            550
        );
    }

    //*emite los datos de la tabla para actualizar estado
    editRecibCaja(doc: ReciboCajaDto) {
        this.recibosCaja = { ...doc };
        this.estadoRecibSelect.emit(doc);
    }

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
