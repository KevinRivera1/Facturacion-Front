import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BancoDto} from "../../model/Bancos.dto";
import {ConceptoLiquidacionDto} from "../../model/ConceptoLiquidacionDto";
import {FileService} from "../../../../../_service/utils/file.service";
import {AppService} from "../../../../../_service/app.service";
import {ConfirmationService} from "primeng/api";
import {ConceptoLiquidacionServiceService} from "../../services/conceptoLiquidacion.service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-concepto-liquidacion-table',
  templateUrl: './concepto-liquidacion-table.component.html',
  styleUrls: ['./concepto-liquidacion-table.component.scss']
})
export class ConceptoLiquidacionTableComponent implements OnInit {



    proceso: string = 'conceptoLiquidacion';
    @Input() listConceptoLiq: ConceptoLiquidacionDto[];
    @Output() conceptoSelect=  new EventEmitter();


    conceptoLiq: ConceptoLiquidacionDto;

    selectedConcepto: ConceptoLiquidacionDto[];

    submitted: boolean;
    loading: boolean;

    exportColumns: any[];

    cols: any[];


  constructor(

      private conceptoLiqService: ConceptoLiquidacionServiceService,
      private fileService: FileService,
      private appservie: AppService,
      private confirmationService: ConfirmationService



  ) { }

  ngOnInit(): void {

      this.construirTabla();
  }

    construirTabla(){

        this.cols= [
            {field: 'idConceptoLiquidacion', header: 'Nro.'},
            {field: 'nombreConceptoLiq', header: 'NOMBRE.'},
            {field: 'descripcionConceptoLiq', header: 'DETALLE.'},
            {field: 'precio', header: 'VALOR.'},
            {field: 'idIva', header: 'I.V.A.'},
            {field: 'estadoConceptoLiq', header: 'ESTADO.'},

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
            this.conceptoLiqService.getAll().subscribe(res => {
                this.listConceptoLiq = res;
                console.log("LLAMADA")
                console.log(this.listConceptoLiq);
                this.loading = false;
            })
        }, 1000);
    }

    registrarNuevo() {

        this.conceptoLiq= new ConceptoLiquidacionDto();
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
                this.eliminarConceptoSelected();
            }
        });
    }


    eliminarConceptoSelected() {

        let indexLista: number = 0;
        for (let i = 0; i < this.selectedConcepto.length; i++) {
            this.conceptoLiqService.deleteObject(this.selectedConcepto[i].idConceptoLiquidacion).subscribe(
                data => {
                    indexLista++;

                    if (indexLista == this.selectedConcepto.length) {
                        this.conceptoLiqService.getAll().subscribe({
                            next: data => {
                                this.listConceptoLiq = data.listado
                            }
                        });
                        this.selectedConcepto = null;
                        this.appservie.msgInfoDetail('error', 'Eliminación', 'Se han eliminado todos los datos seleccionados',)
                    }


                }
            );
        }


    }

    editConcepto(doc: ConceptoLiquidacionDto) {
        this.conceptoLiq = {...doc};

        if(doc.estadoConceptoLiq== 'ACTIVO'){
            doc.estado= true;
        }else{
            doc.estado= false;
        }

        this.conceptoSelect.emit(doc);
    }


    deleteBancos(doc: ConceptoLiquidacionDto) {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de eliminar ' + doc.idConceptoLiquidacion + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarConceptoSimple(doc);
            }
        });
    }

    async eliminarConceptoSimple(doc: ConceptoLiquidacionDto) {
        this.conceptoLiqService.deleteObject(doc.idConceptoLiquidacion).subscribe(
            data => {
                this.appservie.msgDelete();
                this.conceptoLiqService.getAll().subscribe({
                    next: data => {
                        this.listConceptoLiq = data.listado
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
        this.listConceptoLiq.forEach(element => {
            indexLista++;
            element.idConceptoLiquidacion=indexLista;
        });
        this.appservie.exportPdf(this.exportColumns, this.listConceptoLiq, 'Concepto Liquidación', "p");
    }

    exportExcel() {
        let indexLista: number = 0;
        this.listConceptoLiq.forEach(element => {
            indexLista++;
            element.idConceptoLiquidacion=indexLista;
            element.idUsuarioConceptoLiq=null;
            element.fechaConceptoLiq=null;
        });
        this.appservie.exportExcel(this.listConceptoLiq, 'Concepto Liquidación');
    }

    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appservie.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
        }
    }



}
