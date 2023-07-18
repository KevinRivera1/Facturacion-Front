import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoConceptoService } from '../../services/tipoConcepto.service';
import { FileService } from 'src/app/_service/utils/file.service';
import { AppService } from 'src/app/_service/app.service';
import { ConfirmationService } from 'primeng/api';
import { TipoConceptoDto } from '../../model/TipoConcepto.dto';
import { Table } from "primeng/table";
import { TipoConceptoComponent } from '../tipo-concepto/tipo-concepto.component';


@Component({
  selector: 'app-tipo-concepto-table',
  templateUrl: './tipo-concepto-table.component.html',
  styleUrls: ['./tipo-concepto-table.component.css']
})
export class TipoConceptoTableComponent implements OnInit {
    proceso: string = 'tipoConcepto';
    @Input() listtipoConcepto: TipoConceptoDto[];
    @Output() tipoconceptoSelect = new EventEmitter();
  
    tipoConcepto: TipoConceptoDto;
    selectedTipoConcepto: TipoConceptoDto[];
    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
  
    cols: any[];
  

    constructor(

      private funcionmodal: TipoConceptoComponent,
      private tipoConceptoServcice: TipoConceptoService,
      private fileService: FileService,
      private appservie: AppService,
      private confirmationService: ConfirmationService,
    
    ) {}
  
    ngOnInit(): void {
      this.construirTabla();
    }
  
    construirTabla() {
      this.cols = [
        { field: 'idTipoConcepto', header: 'Nro.' },
        { field: 'nombreTipoConcepto', header: 'NOMBRE.' },
        { field: 'descTipoConcepto', header: 'DETALLE.' }
      ];
      this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
      this.loading = false;
    }
  
    
    clear(table: Table) {
      table.clear();
    }
  
    loadData(event) {
      this.loading = true;
      setTimeout(() => {
        this.tipoConceptoServcice.getAll().subscribe(res => {
          this.listtipoConcepto = res;
          console.log("LLAMADA");
          console.log(this.listtipoConcepto);
          this.loading = false;
        });
      }, 1000);
    }
  
  
    registrarNuevo() {
        // @ts-ignore
        this.tipoConcepto= new TipoConceptoDto();
        this.submitted = false;
    }
    deleteSelectedTipoConcepto() {
      this.confirmationService.confirm({
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
        rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
        message: '¿Está seguro de eliminar los elementos seleccionados?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.eliminarTipoConceptoSelected();
        }
      });
    }
  
    eliminarTipoConceptoSelected() {
      let indexLista: number = 0;
      for (let i = 0; i < this.selectedTipoConcepto.length; i++) {
        this.tipoConceptoServcice.deleteObject(this.selectedTipoConcepto[i].idTipoConcepto).subscribe(
          data => {
            indexLista++;
            if (indexLista == this.selectedTipoConcepto.length) {
              this.tipoConceptoServcice.getAll().subscribe({
                next: data => {
                  this.listtipoConcepto = data.listado;
                }
              });
              this.selectedTipoConcepto = null;
              this.appservie.msgInfoDetail('error', 'Eliminación', 'Se han eliminado todos los datos seleccionados');
            }
          }
        );
      }
    }
  
    // editTipoConcepto(doc: TipoConceptoDto) {
    //   this.tipoConcepto = { ...doc };
    //   this.tipoconceptoSelect.emit(doc);
    // }

    editConcepto(doc: TipoConceptoDto){
        this.tipoConcepto = { ...doc};
        this.tipoconceptoSelect.emit(doc);
       
    }
  
    deleteTipoConcepto(doc: TipoConceptoDto) {
      this.confirmationService.confirm({
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
        rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
        message: '¿Está seguro de eliminar ' + doc.idTipoConcepto + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.eliminarTipoConceptoSimple(doc);
        }
      });
    }
  
    async eliminarTipoConceptoSimple(doc: TipoConceptoDto) {
      this.tipoConceptoServcice.deleteObject(doc.idTipoConcepto).subscribe(
        data => {
          this.appservie.msgDelete();
          this.tipoConceptoServcice.getAll().subscribe({
            next: data => {
              this.listtipoConcepto = data.listado;
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
      this.listtipoConcepto.forEach(element => {
        indexLista++;
        element.idTipoConcepto = indexLista;
      });
      this.appservie.exportPdf(this.exportColumns, this.listtipoConcepto, 'tipoConcepto', 'p');
    }
  
    exportExcel() {
      let indexLista: number = 0;
      this.listtipoConcepto.forEach(element => {
        indexLista++;
        element.idTipoConcepto = indexLista;
        element.fechaTc = null;
      });
      this.appservie.exportExcel(this.listtipoConcepto, 'TipoConcepto');
    }
  
    descargarArchivo(fileName: string) {
      try {
        this.fileService.getFileByName(fileName, this.proceso);
      } catch (error) {
        this.appservie.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
      }
    }

    modalfuncion(){
      this.funcionmodal.abrirmodal();
    }
  }
  
/*
export class TipoConceptoTableComponent implements OnInit {

  proceso: string = 'tipoConcepto';
  @Input() listtipoConcepto: TipoConceptoDto[];
  @Output() tipoconceptoSelect=  new EventEmitter();


  tipoConcepto: TipoConceptoDto;
  selectedTipoConcepto: TipoConceptoDto[];
  submitted: boolean;
  loading: boolean;
  exportColumns: any[];

  cols: any[];



constructor(

    private tipoConceptoServcice: TipoConceptoService,
    private fileService: FileService,
    private appservie: AppService,
    private confirmationService: ConfirmationService

) { }


ngOnInit(): void {

    this.construirTabla();
}



construirTabla() {
  this.cols = [
    { field: 'idTipoConcepto', header: 'Nro.' },
    { field: 'nombreTipoConcepto', header: 'NOMBRE.' },
    { field: 'descTipoConcepto', header: 'DETALLE.' }
  ];
  this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  this.loading = false;
}


  clear(table: Table) {
      table.clear();
  }


  loadData(event) {
      this.loading = true;
      setTimeout(() => {
          this.tipoConceptoServcice.getAll().subscribe(res => {
              this.listtipoConcepto = res;
              console.log("LLAMADA")
              console.log(this.listtipoConcepto);
              this.loading = false;
          })
      }, 1000);
  }


  registrarNuevo() {
      // @ts-ignore
      this.tipoConcepto= new TipoConceptoDto();
      this.submitted = false;
  }



  deleteSelectedTipoConcepto() {
      this.confirmationService.confirm({
          acceptLabel: 'Aceptar',
          rejectLabel: 'Cancelar',
          acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
          message: 'Esta seguro de Eliminar los elementos seleccionados?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.eliminarTipoConceptoSelected();
          }
      });
  }



  eliminarTipoConceptoSelected() {

      let indexLista: number = 0;
      for (let i = 0; i < this.selectedTipoConcepto.length; i++) {
          this.tipoConceptoServcice.deleteObject(this.selectedTipoConcepto[i].idTipoConcepto).subscribe(
              data => {
                  indexLista++;

                  if (indexLista == this.selectedTipoConcepto.length) {
                      this.tipoConceptoServcice.getAll().subscribe({
                          next: data => {
                              this.listtipoConcepto = data.listado
                          }
                      });
                      this.selectedTipoConcepto = null;
                      this.appservie.msgInfoDetail('error', 'Eliminación', 'Se han eliminado todos los datos seleccionados',)
                  }


              }
          );
      }


  }


  editTipoConcepto(doc: TipoConceptoDto) {
      this.tipoConcepto = {...doc};

      /*if(doc.estadoTipoConcepto== 'ACTIVO'){
          doc.estado= true;
      }else{
          doc.estado= false;
      }
      console.log(this.tipoConcepto)

      this.tipoconceptoSelect.emit(doc);
  }

  deleteTipoConcepto(doc: TipoConceptoDto) {
      this.confirmationService.confirm({
          acceptLabel: 'Aceptar',
          rejectLabel: 'Cancelar',
          acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
          message: 'Esta seguro de eliminar ' + doc.idTipoConcepto + '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.eliminarTipoConceptoSimple(doc);
          }
      });
  }



  async eliminarTipoConceptoSimple(doc: TipoConceptoDto) {
      this.tipoConceptoServcice.deleteObject(doc.idTipoConcepto).subscribe(
          data => {
              this.appservie.msgDelete();
              this.tipoConceptoServcice.getAll().subscribe({
                  next: data => {
                      this.listtipoConcepto = data.listado
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
      this.listtipoConcepto.forEach(element => {
          indexLista++;
          element.idTipoConcepto=indexLista;
        //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
      });
      this.appservie.exportPdf(this.exportColumns, this.listtipoConcepto, 'tipoConcepto', "p");
  }

  exportExcel() {
      let indexLista: number = 0;
      this.listtipoConcepto.forEach(element => {
          indexLista++;
          element.idTipoConcepto=indexLista;
          element.idTipoConcepto=null;
        //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
          element.fechaTc=null;
      });
      this.appservie.exportExcel(this.listtipoConcepto, 'TipoConcepto');
  }

  descargarArchivo(fileName: string) {
      try {
          this.fileService.getFileByName(fileName, this.proceso);
      } catch (error) {
          this.appservie.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
      }
  }

}
*/