import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstadoFacturaDto } from '../../model/EstadoFacturaDto';

import { FileService } from '../../../../../_service/utils/file.service';
import { AppService } from '../../../../../_service/app.service';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EstadoFacturaService } from '../../services/estadoFactura.service';

@Component({
    selector: 'app-estado-factura-table',
    templateUrl: './estado-factura-table.component.html',
    styleUrls: ['./estado-factura-table.component.scss'],
})
export class EstadoFacturaTableComponent implements OnInit {
    proceso: string = 'estadosFact';

    @Input() listestadoFact: EstadoFacturaDto[];
    @Output() estadoFactSelect = new EventEmitter();

    estadoFact: EstadoFacturaDto;
    selectedEstados: EstadoFacturaDto[];
    submitted: boolean;
    loading: boolean;

    exportColumns: any[];

    cols: any[];

    constructor(
        private estadoFacturaService: EstadoFacturaService,
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.construirTabla();
    }

    construirTabla() {
        this.cols = [
            { field: 'idEstadoFact', header: 'Nro.' },
            { field: 'nombreEstadoFact', header: 'NOMBRE.' },
            { field: 'detalleestadoFact', header: 'DETALLE.' },
        ];
        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
        this.loading = false;
    }

    clear(table: Table) {
        table.clear();
    }

    loadData(event) {
        this.loading = true;
        setTimeout(() => {
            this.estadoFacturaService.getAll().subscribe((res) => {
                this.listestadoFact = res;
                console.log('LLAMADA');
                console.log(this.listestadoFact);
                this.loading = false;
            });
        }, 1000);
    }

    registrarNuevo() {
        // @ts-ignore
        this.estadoFact = new EstadoFacturaDto();
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
        for (let i = 0; i < this.selectedEstdos.length; i++) {
            this.estadoFacturaService
                .deleteObject(this.selectedEstdos[i].idEstadoComprobante)
                .subscribe((data) => {
                    indexLista++;

                    if (indexLista == this.selectedEstdos.length) {
                        this.estadoFacturaService.getAll().subscribe({
                            next: (data) => {
                                this.listestadoFact = data.listado;
                            },
                        });
                        this.selectedEstdos = null;
                        this.appservie.msgInfoDetail(
                            'error',
                            'Eliminación',
                            'Se han eliminado todos los datos seleccionados'
                        );
                    }
                });
        }
    }

    editEstadoFact(doc: EstadoFacturaDto) {
        this.estadoFact = { ...doc };

        if (doc.nombreEstadoComp == 'GENERADO') {
            doc.estado = true;
        } else {
            doc.estado = false;
        }

        this.estadoFactSelect.emit(doc);
    }

    deleteEstadoFact(doc: EstadoFacturaDto) {
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

    async eliminarEstadofactSimple(doc: EstadoFacturaDto) {
        this.estadoFacturaService
            .deleteObject(doc.idEstadoComprobante)
            .subscribe((data) => {
                this.appservie.msgDelete();
                this.estadoFacturaService.getAll().subscribe({
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
            'Estado Factura',
            'p'
        );
    }

    exportExcel() {
        let indexLista: number = 0;
        this.listestadoFact.forEach((element) => {
            indexLista++;
            element.idEstadoComprobante = indexLista;
        });
        this.appservie.exportExcel(this.listestadoFact, 'Estado Factura');
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
