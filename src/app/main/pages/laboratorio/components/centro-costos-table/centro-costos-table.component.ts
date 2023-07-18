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
    proceso: string = 'centroC';
    @Input() listCentroC: CentroCostoDto[];
    @Output() centroCSelect = new EventEmitter();

    CentroCs: CentroCostoDto;
    selectedCentroCostos: CentroCostoDto[];
    submitted: boolean;
    loading: boolean;
    exportColumns: any[];
    cols: any[];

    constructor(
        private CentroCostosServcice: CentroCostosService,
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService,
        private centroCostosComponent: CentroCostosComponent

    ) {
        
    }



    ngOnInit(): void {
        this.construirTabla();
    }


    construirTabla() {
        // Inicializa las columnas de una tabla, crea una estructura de columnas para su exportación 
        this.cols = [
            { field: 'idCentroCosto', header: 'Nro.' },
            { field: 'nombreCentroCosto', header: 'NOMBRE.' },
            // { field: 'codCentroCosto', header: 'CODIGO.' },
            { field: 'descCentroCosto', header: 'DETALLE.' },
            { field: 'estadoCentroCosto', header: 'ESTADO.' },
        ];
        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
        this.loading = false;
    }
    
    
    clear(table: Table) {
        // Se utiliza para borrar el contenido de una tabla 
        table.clear();
    }

    loadData(event) {
        this.loading = true;
        //Cargar datos de los centros de costos desde un servicio,
        //Actualizar una variable que almacena los datos y mostrar información en la consola
        setTimeout(() => {
            //Espera de 1 segundo es comúnmente utilizado para simular una operación asíncrona de carga de datos.
            this.CentroCostosServcice.getAllC().subscribe((res) => {
                this.listCentroC = res;
                console.log('LLAMADA');
                console.log(this.listCentroC);
                this.loading = false;
            });
        }, 1000);
    }

    registrarNuevoC() {
        // @ts-ignore
        this.CentroCs = new CentroCostoDto();
        // Inicializar un nuevo objeto CentroCostoDto 
        this.submitted = false;
        // Restablecer el estado de envío del formulario estableciendo submitted FALSO
    }

    deleteSelectedCentroCosto() {
        // Muestra un cuadro de diálogo de confirmación al usuario con opciones para aceptar o cancelar.
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de Eliminar los elementos seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarCentroCostoSelected();
            },
            //Elimina los elementos de centro de costo seleccionados
        });
    }

    eliminarCentroCostoSelected() {
        //Elimina uno por uno mediante llamadas al servicio
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
                            'Eliminación',
                            'Se han eliminado todos los datos seleccionados'
                        );
                    }
                });
        }
    }

    editCentroCosto(doc: CentroCostoDto) {
        this.CentroCs = { ...doc };
        //Asigna una copia del objeto doc a una variable 


        // if (doc.estadoCentroCosto == 'ACTIVO') {
        //     doc.estado = true;
        // } else {
            
        //     doc.estado = false;
        // }

        this.centroCSelect.emit(doc);
    }


    llamarModal (){
        this.centroCostosComponent.abrirmodal();
    }

    deleteCentroCosto(doc: CentroCostoDto) {
        //Muestra un cuadro de diálogo de confirmación al usuario con opciones para aceptar o cancelar
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de eliminar el id ' + doc.idCentroCosto + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarCentroCostoSimple(doc);
            },
        });
    }

    async eliminarCentroCostoSimple(doc: CentroCostoDto) {
        //Eliminar un centro de costo específico
        this.CentroCostosServcice.deleteObjectC(doc.idCentroCosto).subscribe((data) => {
            this.appservie.msgDelete();
            this.CentroCostosServcice.getAllC().subscribe({
                next: (data) => {
                    this.listCentroC = data.listado;
                },
            });
        });
    }

    hideDialog() {
        this.submitted = false;
    }

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

    exportExcel() {
        let indexLista: number = 0;
        this.listCentroC.forEach((element) => {
            indexLista++;
            element.idCentroCosto = indexLista;
            element.idUsuarioCentroCosto = null;
            // element.fechaCentroCosto= null;
        });
        this.appservie.exportExcel(this.listCentroC, 'Centro de Costos');
    }

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
