import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CretencionDto} from "../../model/CretencionDto";
import {Table} from "primeng/table";
import {CretencionService} from "../../services/cretencion.service";
import {FileService} from "../../../../../_service/utils/file.service";
import {AppService} from "../../../../../_service/app.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-cretencion-table',
  templateUrl: './cretencion-table.component.html',
  styleUrls: ['./cretencion-table.component.scss']
})
export class CretencionTableComponent implements OnInit {
    proceso: string = 'cretencion';
    @Input() listCretencion: CretencionDto[];
    @Output() cretencionSelect= new EventEmitter();
    @Input() loading : Boolean=false;

    cretencion: CretencionDto;
    selectedCretencion: CretencionDto[];
    submitted: boolean;

    exportColumns:any[];
    mensajeEliminacion:string;

    cols:any[];


    constructor(
        private  cretencionService: CretencionService,
        public fileService: FileService,
        private appservice: AppService,
        private confirmationService: ConfirmationService,

    ) { }


    construirTabla() {
        this.cols = [
            {field: 'codigoCRetencion', header: 'COMPROBANTE RETENCIÓN'},
            {field: 'fechaComprobanteRet', header: 'FECHA'},
            {field: 'estadoSriRet', header: 'ESTADO SRI'},

        ];
        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
        //this.loading = false;
    }


    clear(table: Table) {
        table.clear();
    }


    loadData(event) {
        this.loading = true;
        setTimeout(() => {
            this.cretencionService.getAll().subscribe(res => {
                this.listCretencion = res.listado;
                this.loading = false;
            })
        }, 1000);
    }


    registrarNuevo() {
        this.cretencion = new CretencionDto();
        this.submitted = false;
    }

    editCretencion(doc: CretencionDto) {
        this.cretencion = {...doc};
        this.cretencionSelect.emit(doc);
    }


    hideDialog() {
        this.submitted = false;
    }

    exportPdf() {
        this.appservice.exportPdf(this.exportColumns, this.listCretencion, 'Valores Iva', "p");
    }




    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appservice.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
        }
    }





  ngOnInit(): void {
        this.construirTabla();
  }

}
