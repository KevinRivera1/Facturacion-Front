import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FileService } from '../../../../../_service/utils/file.service';
import { AppService } from '../../../../../_service/app.service';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CentroCostoDto } from '../../model/CentroCosto.dto';
import { CentroCostosService } from '../../services/centro-costos.service';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { severities } from 'src/app/_enums/constDomain';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { CentroCostosComponent } from '../centro-costos/centro-costos.component';

@Component({
    selector: 'app-centro-costos-table',
    templateUrl: './centro-costos-table.component.html',
    styleUrls: ['./centro-costos-table.component.scss'],
})
export class CentroCostosTableComponent implements OnInit {

    proceso: string = 'centroC';                  //Almacena el valor 'centroC'
   
    @Input() listCentroC: CentroCostoDto[];       //Recibir una lista de objetos CentroCostoDto desde un componente padre
   
    @Output() centroCSelect = new EventEmitter(); //Salida que emite un objeto CentroCostoDto cuando es seleccionado
   
    CentroCs: CentroCostoDto;                     //Almacenar un centro de costo
   
    selectedCentroCostos: CentroCostoDto[];       //Almacena los centros de costo seleccionados
   
    submitted: boolean;                           //Eenviado el formulario
   
    loading: boolean;                             //Cargando informacion
   
    exportColumns: any[];                         //Define las columnas de la tabla de centros de costo
   
    cols: any[];


    constructor(                     //Inyectan los servicios y dependencias necesarios
        private CentroCostosServcice: CentroCostosService,
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService,
        private centroCostosComponent: CentroCostosComponent
    ) {
    }

    ngOnInit(): void {                //Ejecuta cuando el componente es inicializado
        this.construirTabla();        // Se construye la tabla con las columnas definidas
    }

    construirTabla() {    //Construir la tabla con sus columnas y configuraciones
        this.cols = [
            { field: 'idCentroCosto', header: 'Nro.' },
            { field: 'nombreCentroCosto', header: 'NOMBRE.' },
            { field: 'codCentroCosto', header: 'CODIGO.' },
            { field: 'descCentroCosto', header: 'DETALLE.' },
            { field: 'estadoCentroCosto', header: 'ESTADO.' },
        ];
        this.exportColumns = this.cols.map((col) => ({//Exportar las columnas a archivos PDF y Excel
            title: col.header,
            dataKey: col.field,
        }));
        this.loading = false;                          // Se establece loading a false
    }
    
    clear(table: Table) {//Limpiar la tabla
        table.clear();
    }

    loadData(event) {    //Cargar datos en la tabla
        this.loading = true;
        setTimeout(() => {
            this.CentroCostosServcice.getAllC().subscribe((res) => {
                this.listCentroC = res;
                console.log('LLAMADA');
                console.log(this.listCentroC);
                this.loading = false;
            });
        }, 1000);
    }

    registrarNuevoC() {    //Registrar un nuevo centro de costo
        // @ts-ignore
        this.CentroCs = new CentroCostoDto();
        this.submitted = false;
    }

    //Eliminar los centros de costo seleccionados despues de confirmar
    deleteSelectedCentroCosto() {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-danger',
            message: '¿Esta seguro de eliminar los elementos seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarCentroCostoSelected();
            },
        });
    }

    //Eliminar los centros de costo seleccionados
    eliminarCentroCostoSelected() {
        let indexLista: number = 0;
        for (let i = 0; i < this.selectedCentroCostos.length; i++) {
            this.CentroCostosServcice
                .deleteObjectC(this.selectedCentroCostos[i].idCentroCosto)
                .subscribe((data) => {
                    indexLista++;

                    if (indexLista == this.selectedCentroCostos.length) {
                        this.CentroCostosServcice.getAllC().subscribe({
                            next: (data) => {
                                this.listCentroC = data.listado;
                            },
                        });
                        this.selectedCentroCostos = null;
                        this.appservie.msgInfoDetail(
                            'error',
                            'Eliminacion',
                            'Se han eliminado todos los datos seleccionados'
                        );
                    }
                });
        }
    }

    //Editar un centro de costo seleccionado
    editCentroCosto(doc: CentroCostoDto) {
        this.CentroCs = { ...doc };
        this.centroCSelect.emit(doc);
    }




    
    //Llamar al metodo abrirmodal() del componente CentroCostosComponent
    llamarModal (){
        this.centroCostosComponent.abrirmodal();
    }





    //Eliminar un centro de costo despues de confirmar
    deleteCentroCosto(doc: CentroCostoDto) {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-danger',
            message: '¿Esta seguro de eliminar ' + doc.nombreCentroCosto + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarCentroCostoSimple(doc);
            },
        });
    }

    //Eliminar un centro de costo
    async eliminarCentroCostoSimple(doc: CentroCostoDto) {
        this.CentroCostosServcice.deleteObjectC(doc.idCentroCosto).subscribe((data) => {
            this.appservie.msgDelete();
            this.CentroCostosServcice.getAllC().subscribe({
                next: (data) => {
                    this.listCentroC = data.listado;
                },
            });
        });
    }

    //Ocultar el dialogo del formulario
    hideDialog() {
        this.submitted = false;
    }

    //Exportar los datos de la tabla a un archivo PDF
    exportPdf() {
        let indexLista: number = 0;
        this.listCentroC.forEach((element) => {
            indexLista++;
            element.idCentroCosto = indexLista;
        });
        this.appservie.exportPdf(
            this.exportColumns,
            this.listCentroC,
            'Centro de Costos',
            'p'
        );
    }

    //Exportar los datos de la tabla a un archivo Excel
    exportExcel() {
        let indexLista: number = 0;
        this.listCentroC.forEach((element) => {
            indexLista++;
            element.idCentroCosto = indexLista;
            element.idUsuarioCentroCosto = null;
        });
        this.appservie.exportExcel(this.listCentroC, 'Centro de Costos');
    }

    //Descargar un archivo
    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appservie.msgInfoDetail(
                'error',
                'Error',
                'Error al descargar el archivo'
            );
        }
    }
}
