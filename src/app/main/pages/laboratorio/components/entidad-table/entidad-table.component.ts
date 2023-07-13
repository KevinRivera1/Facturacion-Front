import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FileService} from "../../../../../_service/utils/file.service";
import {AppService} from "../../../../../_service/app.service";
import {ConfirmationService} from "primeng/api";
import {Table} from "primeng/table";


@Component({
  selector: 'app-entidad-table',
  templateUrl: './entidad-table.component.html',
  styleUrls: ['./entidad-table.component.scss']
})
export class EntidadTableComponent implements OnInit {

    proceso: string = 'tiposervicio';

    @Output() tipoServicioSelect = new EventEmitter();


    submitted: boolean;
    loading: boolean;
    exportColumns: any[];

    cols: any[];

    constructor(

        private fileService: FileService,
        private appservice: AppService,
        private confirmationService: ConfirmationService
    ) {
    }

    ngOnInit() {
        this.construirTabla();
    }

    construirTabla() {
        this.cols = [
            {field: 'idTipoServicio', header: 'ID'},
            {field: 'nombreTipo', header: 'NOMBRE'},
            {field: 'detalleTipo', header: 'DETALLE'},
            {field: 'fechaCreacionTipo', header: 'FECHA'},
            {field: 'usuarioCreacion', header: 'USUARIO'},
            //{field: 'servicioListDto, header: 'ID'},
        ];
        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }



    registrarNuevo() {

        this.submitted = false;
    }










    hideDialog() {
        this.submitted = false;
    }





    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appservice.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
        }
    }

}
