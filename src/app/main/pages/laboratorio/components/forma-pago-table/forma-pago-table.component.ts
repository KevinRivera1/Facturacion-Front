import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {FileService} from "../../../../../_service/utils/file.service";
import {AppService} from "../../../../../_service/app.service";
import {ConfirmationService} from "primeng/api";
import { Table } from "primeng/table";
import { FormaPagoDto } from '../../model/FormaPago.dto';
import { FormaPagoService } from '../../services/formaPago.service';

@Component({
  selector: 'app-forma-pago-table',
  templateUrl: './forma-pago-table.component.html',
  styleUrls: ['./forma-pago-table.component.scss']
})
export class FormaPagoTableComponent implements OnInit {

 

  proceso: string = 'formapago';
  @Input() listFormaPago: FormaPagoDto[];
  @Output() formapagoSelect=  new EventEmitter();


  formapago: FormaPagoDto;
  selectedFormaPago: FormaPagoDto[];
  submitted: boolean;
  loading: boolean;

  exportColumns: any[];

  cols: any[];



 constructor(

    private formapagoServcice: FormaPagoService,
    private fileService: FileService,
    private appservie: AppService,
    private confirmationService: ConfirmationService

) { }


ngOnInit(): void {

    this.construirTabla();
}



construirTabla(){

    this.cols= [
        {field: 'idFormaPago', header: 'Nro.'},
        {field: 'nombreFp', header: 'NOMBRE.'},
        {field: 'descripcionFp', header: 'DETALLE.'},
        {field: 'activo', header: 'ESTADO.'},

    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.loading = false;

}

  clear(table: Table) {
      table.clear();
  }


  loadData(event) {
      this.loading = true;
      setTimeout(() => {
          this.formapagoServcice.getAll().subscribe(res => {
              this.listFormaPago = res;
              console.log("LLAMADA")
              console.log(this.listFormaPago);
              this.loading = false;
          })
      }, 1000);
  }


  registrarNuevo() {
      // @ts-ignore
      this.formapago= new FormaPagoDto();
      this.submitted = false;
  }



  deleteSelectedFormaPago() {
      this.confirmationService.confirm({
          acceptLabel: 'Aceptar',
          rejectLabel: 'Cancelar',
          acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
          message: 'Esta seguro de Eliminar los elementos seleccionados?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.eliminarFormaPagoSelected();
          }
      });
  }



  eliminarFormaPagoSelected() {

      let indexLista: number = 0;
      for (let i = 0; i < this.selectedFormaPago.length; i++) {
          this.formapagoServcice.deleteObject(this.selectedFormaPago[i].idFormaPago).subscribe(
              data => {
                  indexLista++;

                  if (indexLista == this.selectedFormaPago.length) {
                      this.formapagoServcice.getAll().subscribe({
                          next: data => {
                              this.listFormaPago = data.listado
                          }
                      });
                      this.selectedFormaPago = null;
                      this.appservie.msgInfoDetail('error', 'Eliminación', 'Se han eliminado todos los datos seleccionados',)
                  }


              }
          );
      }


  }


  editFormaPago(doc: FormaPagoDto) {
      this.formapago = {...doc};

    /*   if(doc.activo== 'ACTIVO'){
          doc.estado= true;
      }else{
          doc.estado= false;
      } 
 */
      this.formapagoSelect.emit(doc);
  }

  deleteFormaPago(doc: FormaPagoDto) {
      this.confirmationService.confirm({
          acceptLabel: 'Aceptar',
          rejectLabel: 'Cancelar',
          acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
          message: 'Esta seguro de eliminar ' + doc.idFormaPago + '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.eliminarFormaPagoSimple(doc);
          }
      });
  }



  async eliminarFormaPagoSimple(doc: FormaPagoDto) {
      this.formapagoServcice.deleteObject(doc.idFormaPago).subscribe(
          data => {
              this.appservie.msgDelete();
              this.formapagoServcice.getAll().subscribe({
                  next: data => {
                      this.listFormaPago = data.listado
                  }
              });

          }
      );
  }


  hideDialog() {
      this.submitted = false;
  }

  exportPdf() {

      let indexLista: number = 0;
      this.listFormaPago.forEach(element => {
          indexLista++;
          element.idFormaPago=indexLista;
        //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
      });
      this.appservie.exportPdf(this.exportColumns, this.listFormaPago, 'Forma pago', "p");
  }

  exportExcel() {
      let indexLista: number = 0;
      this.listFormaPago.forEach(element => {
          indexLista++;
          element.idFormaPago=indexLista;
          element.idUsuarioFp=null;
        //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
          element.fechaFp=null;
      });
      this.appservie.exportExcel(this.listFormaPago, 'Bancos');
  }

  descargarArchivo(fileName: string) {
      try {
          this.fileService.getFileByName(fileName, this.proceso);
      } catch (error) {
          this.appservie.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
      }
  }
 



}
