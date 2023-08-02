import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppService } from 'src/app/_service/app.service';
import { FileService } from 'src/app/_service/utils/file.service';

@Component({
  selector: 'app-anular-recibo-caja-table',
  templateUrl: './anular-recibo-caja-table.component.html',
  styleUrls: ['./anular-recibo-caja-table.component.scss']
})
export class AnularReciboCajaTableComponent implements OnInit {

  constructor(
    private fileService: FileService,
    private appservie: AppService,
    private confirmationService: ConfirmationService,
) { }

  ngOnInit() {
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
}
