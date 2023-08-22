import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
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

    @Input() recibos: ReciboCajaDto[] = [];

    @Output() editReciboSeleccionado = new EventEmitter();
    //*Tabal emite dato para actualizar etado
    recibosCajaSelect: ReciboCajaDto;


    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
    cols: any[];

    constructor(
        private reciboCajaService: ReciboCajaService,
        private fileService: FileService,
        private appservice: AppService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.construirTabla();
    }

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

    filtrarRecibos(recibos: ReciboCajaDto[]) {
        this.recibos = recibos;
    }

    //*emite los datos de la tabla para actualizar estado
    editRecibCaja(doc: ReciboCajaDto) {
        this.recibosCajaSelect = { ...doc };
        this.editReciboSeleccionado.emit(doc);
        this.modalOpen();
        console.log("🚀Emit: ", this.recibosCajaSelect)
    }

    exportPdf() {
        let indexLista: number = 0;
        this.recibos.forEach((element) => {
            indexLista++;
            element.idCajaRc = indexLista;
        });
        this.appservice.exportPdf(
            this.exportColumns,
            this.recibos,
            'Anular Recibo Caja',
            'p'
        );
    }

    exportExcel() {
        let indexLista: number = 0;
        this.recibos.forEach((element) => {
            indexLista++;
            element.idCajaRc = indexLista;
        });
        this.appservice.exportExcel(this.recibos, 'Anulacion Recibos');
    }

    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appservice.msgInfoDetail(
                'error',
                'Error',
                'Error al descargar el archivo'
            );
        }
    }

    modalOpen() {
        this.displayModal = true;
        console.log('abrir modal desde tabla');
    }

    closeModal() {
        this.displayModal = false;
        console.log('cerrando modal');
    }
}
