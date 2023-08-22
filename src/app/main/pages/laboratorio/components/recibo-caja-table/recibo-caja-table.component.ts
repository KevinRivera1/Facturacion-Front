import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { FileService } from 'src/app/_service/utils/file.service';
import { ReciboCajaService } from '../../services/reciboCaja.service';
import { ReciboCajaDto } from '../../model/reciboCajaDto';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-recibo-caja-table',
    templateUrl: './recibo-caja-table.component.html',
    styleUrls: ['./recibo-caja-table.component.scss'],
})
export class ReciboCajaTableComponent implements OnInit {
    proceso: string = 'anular Recibo caja';
    displayModal: boolean = false;

    @Input() recibos : ReciboCajaDto [] =[];;

    
    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
    cols: any[];

    constructor(
        private reciboCajaService: ReciboCajaService,
        private fileService: FileService,
        private appService: AppService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.construirTabla();
    }

    construirTabla() {
        this.cols = [
            { field: 'codRcaja', header: 'Nro.RECIBO' },
            { field: 'nombreConsumidorRc', header: 'NOMBRE.' },
            { field: 'rucConsumidorRc', header: 'Ruc.' },
            { field: 'fechaRcaja', header: 'FECHA.' },
            { field: 'totalRc', header: 'TOTAL' },
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

    filtrarRecibos(recibos: any[]) {
        this.recibos = recibos;
        this.appService.msgInfoDetail(
            severities.INFO,
            'INFO',
            'Datos Cargados exitosamente',
            550
        );
    }

    modalOpen() {
        this.displayModal = true;
        console.log('abrir modal desde tabla');
    }

    closeModal() {
        this.displayModal = false;
        console.log('cerrando modal');
    }


    exportPdf() {
        let indexLista: number = 0;
        this.recibos.forEach((element) => {
            indexLista++;
            element.idReciboCaja = indexLista;
        });
        this.appService.exportPdf(
            this.exportColumns,
            this.recibos,
            'Centro de Costos',
            'p'
        );
    }

    exportPdfById(idReciboCaja: number) {
        // Buscar el recibo con el idReciboCaja proporcionado
        const recibo = this.recibos.find((element) => element.idReciboCaja === idReciboCaja);
    
        if (!recibo) {
            console.log('No se encontró un recibo con el idReciboCaja proporcionado.');
            return;
        }
    
        // Crear un nuevo documento PDF
        const doc = new jsPDF();
    
        // Agregar contenido al PDF
        doc.setFontSize(12);
        doc.text(`Recibo de Caja Nº ${recibo.idReciboCaja}`, 10, 10);
        doc.text(`Recibo de Caja Nº ${recibo.codRcaja}`, 10, 10);
        doc.text(`Recibo de Caja Nº ${recibo.nombreConsumidorRc}`, 10, 10);

        // Agregar más contenido aquí
    
        // Guardar el PDF
        doc.save(`recibo_caja_${recibo.codRcaja}.pdf`);
    }
}

