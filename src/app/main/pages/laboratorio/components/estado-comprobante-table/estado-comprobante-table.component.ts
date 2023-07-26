import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { EstadoComprobanteDto } from '../../model/EstadoComprobanteDto';

import { EstadoComprobanteService } from '../../services/estadoComprobante.service';
import { ConfirmationService } from 'primeng/api';
import { AppService } from 'src/app/_service/app.service';
import { FileService } from 'src/app/_service/utils/file.service';
import { EstadoComprobanteComponent } from '../estado-comprobante/estado-comprobante.component';

@Component({
    selector: 'app-estado-comprobante-table',
    templateUrl: './estado-comprobante-table.component.html',
    styleUrls: ['./estado-comprobante-table.component.scss'],
})
export class EstadoComprobanteTableComponent implements OnInit {
    proceso: string = 'estadosFact';
    @Input() listestadoFact: EstadoComprobanteDto[] = [];
    @Output() estadoFactSelect = new EventEmitter();

    estadoFact: EstadoComprobanteDto;

    selectedEstados: EstadoComprobanteDto[] = [];
    submitted: boolean;
    loading: boolean;

    exportColumns: any[];

    cols: any[];

    constructor(
        private modalForm: EstadoComprobanteComponent,
        private estadoComprobanteService: EstadoComprobanteService,
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.construirTabla();
    }

    construirTabla() {
        this.cols = [
            { field: 'idEstadoComprobante', header: 'Nro.' },
            { field: 'nombreEstadoComp', header: 'NOMBRE.' },
            { field: 'detalleEstadoComp', header: 'DETALLE.' },
        ];
        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
        this.loading = false;
    }

    Clear(table: Table) {
        table.clear();
        console.log('limpiando tabla');
    }

    loadData(event) {
        this.loading = true;
        setTimeout(() => {
            this.estadoComprobanteService.getAll().subscribe((res) => {
                this.listestadoFact = res;
                console.log('LLAMADA');
                console.log(this.listestadoFact);
                this.loading = false;
            });
        }, 1000);
    }

    registrarNuevo() {
        // @ts-ignore
        this.estadoFact = new estadoComprobanteDto();
        this.submitted = false;
    }

    deleteSelectedBancos() {
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
                this.eliminarEstadoFactSelected();
            },
        });
    }

    eliminarEstadoFactSelected() {
        let indexLista: number = 0;
        for (let i = 0; i < this.selectedEstados.length; i++) {
            this.estadoComprobanteService
                .deleteObject(this.selectedEstados[i].idEstadoComprobante)
                .subscribe((data) => {
                    indexLista++;

                    if (indexLista == this.selectedEstados.length) {
                        this.estadoComprobanteService.getAll().subscribe({
                            next: (data) => {
                                this.listestadoFact = data.listado;
                            },
                        });
                        this.selectedEstados = null;
                        this.appservie.msgInfoDetail(
                            'error',
                            'Eliminación',
                            'Se han eliminado todos los datos seleccionados'
                        );
                    }
                });
        }
    }

    editEstadoFact(doc: EstadoComprobanteDto) {
        this.estadoFact = { ...doc };

        /*if (doc.nombreEstadoComp == 'GENERADO') {
            doc.estado = true;
        } else {
            doc.estado = false;
        }*/
        this.estadoFactSelect.emit(doc);
    }

    modalOpen() {
        this.modalForm.onDisplayForm();
    }

    deleteEstadoFact(doc: EstadoComprobanteDto) {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de eliminar ' + doc.idEstadoComprobante + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarEstadofactSimple(doc);
            },
        });
    }

    async eliminarEstadofactSimple(doc: EstadoComprobanteDto) {
        this.estadoComprobanteService
            .deleteObject(doc.idEstadoComprobante)
            .subscribe((data) => {
                this.appservie.msgDelete();
                this.estadoComprobanteService.getAll().subscribe({
                    next: (data) => {
                        this.listestadoFact = data.listado;
                    },
                });
            });
    }

    hideDialog() {
        this.submitted = false;
    }

    exportPdf() {
        let indexLista: number = 0;
        this.listestadoFact.forEach((element) => {
            indexLista++;
            element.idEstadoComprobante = indexLista;
        });
        this.appservie.exportPdf(
            this.exportColumns,
            this.listestadoFact,
            'Estado Comprobante',
            'p'
        );
    }

    exportExcel() {
        let indexLista: number = 0;
        this.listestadoFact.forEach((element) => {
            indexLista++;
            element.idEstadoComprobante = indexLista;
        });
        this.appservie.exportExcel(this.listestadoFact, 'Estado Comprobante');
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
