import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { BancoDto } from "../../model/Bancos.dto";
import {BancosService} from "../../services/bancos.service";
import {FileService} from "../../../../../_service/utils/file.service";
import {AppService} from "../../../../../_service/app.service";
import {ConfirmationService} from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: 'app-bancos-table',
  templateUrl: './bancos-table.component.html',
  styleUrls: ['./bancos-table.component.scss']
})
export class BancosTableComponent implements OnInit {


    proceso: string = 'bancos';
    @Input() listBancos: BancoDto[];
    @Output() bancosSelect=  new EventEmitter();


    bancos: BancoDto;
    selectedBancos: BancoDto[];
    submitted: boolean;
    loading: boolean;

    exportColumns: any[];

    cols: any[];



  constructor(

      private bancosServcice: BancosService,
      private fileService: FileService,
      private appservie: AppService,
      private confirmationService: ConfirmationService

  ) { }


  ngOnInit(): void {

      this.construirTabla();
  }



  construirTabla(){

      this.cols= [
          {field: 'idBancos', header: 'Nro.'},
          {field: 'nombreBancos', header: 'NOMBRE.'},
          {field: 'descBancos', header: 'DETALLE.'},
          {field: 'estadoBancos', header: 'ESTADO.'},

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
            this.bancosServcice.getAll().subscribe(res => {
                this.listBancos = res;
                console.log("LLAMADA")
                console.log(this.listBancos);
                this.loading = false;
            })
        }, 1000);
    }


    registrarNuevo() {
        // @ts-ignore
        this.bancos= new BancoDto();
        this.submitted = false;
    }



    deleteSelectedBancos() {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de Eliminar los elementos seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarBancosSelected();
            }
        });
    }



    eliminarBancosSelected() {

        let indexLista: number = 0;
        for (let i = 0; i < this.selectedBancos.length; i++) {
            this.bancosServcice.deleteObject(this.selectedBancos[i].idBancos).subscribe(
                data => {
                    indexLista++;

                    if (indexLista == this.selectedBancos.length) {
                        this.bancosServcice.getAll().subscribe({
                            next: data => {
                                this.listBancos = data.listado
                            }
                        });
                        this.selectedBancos = null;
                        this.appservie.msgInfoDetail('error', 'Eliminación', 'Se han eliminado todos los datos seleccionados',)
                    }


                }
            );
        }


    }


    editBancos(doc: BancoDto) {
        this.bancos = {...doc};

        if(doc.estadoBancos== 'ACTIVO'){
            doc.estado= true;
        }else{
            doc.estado= false;
        }

        this.bancosSelect.emit(doc);
    }

    deleteBancos(doc: BancoDto) {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de eliminar ' + doc.idBancos + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarBancosSimple(doc);
            }
        });
    }



    async eliminarBancosSimple(doc: BancoDto) {
        this.bancosServcice.deleteObject(doc.idBancos).subscribe(
            data => {
                this.appservie.msgDelete();
                this.bancosServcice.getAll().subscribe({
                    next: data => {
                        this.listBancos = data.listado
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
        this.listBancos.forEach(element => {
            indexLista++;
            element.idBancos=indexLista;
          //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
        });
        this.appservie.exportPdf(this.exportColumns, this.listBancos, 'Bancos', "p");
    }

    exportExcel() {
        let indexLista: number = 0;
        this.listBancos.forEach(element => {
            indexLista++;
            element.idBancos=indexLista;
            element.idUsuarioBancos=null;
          //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
            element.fechaBancos=null;
        });
        this.appservie.exportExcel(this.listBancos, 'Bancos');
    }

    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appservie.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
        }
    }

}
