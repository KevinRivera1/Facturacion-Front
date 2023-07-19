import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ConceptoDto } from '../../model/ConceptoDto';
import { ConceptoService } from '../../services/concepto.service';
import { FileService } from '../../../../../_service/utils/file.service';
import { AppService } from '../../../../../_service/app.service';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ConceptoComponent } from '../concepto/concepto.component';

@Component({
    selector: 'app-concepto-table',
    templateUrl: './concepto-table.component.html',
})
export class ConceptosTableComponent implements OnInit {
    proceso: string = 'conceptos';
    @Input() listConceptos: ConceptoDto[];
    @Output() conceptosSelect = new EventEmitter();

    conceptos: ConceptoDto;
    selectedConceptos: ConceptoDto[];
    submitted: boolean;
    loading: boolean;

    exportColumns: any[];

    cols: any[];

    constructor(
        private conceptocomponent: ConceptoComponent,
        private conceptosService: ConceptoService,
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.construirTabla();
    }

    construirTabla() {
        this.cols = [
            { field: 'idConcepto', header: 'Nro.' },
            { field: 'nombreConcepto', header: 'NOMBRE.' },
            { field: 'estadoConcetpto', header: 'ESTADO.' },
            { field: 'descConcepto', header: 'DETALLE.' },
            { field: 'codigoConcepto', header: 'CODIGO.' },
            { field: 'valorConcepto', header: 'VALOR.' },
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
            this.conceptosService.getAll().subscribe((res) => {
                this.listConceptos = res;
                console.log('LLAMADA');
                console.log(this.listConceptos);
                this.loading = false;
            });
        }, 1000);
    }

    registrarNuevo() {
        // @ts-ignore
        this.conceptos = new ConceptoDto();
        this.submitted = false;
    }

    deleteSelectedConceptos() {
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
                this.eliminarConceptosSelected();
            },
        });
    }

    eliminarConceptosSelected() {
        let indexLista: number = 0;
        for (let i = 0; i < this.selectedConceptos.length; i++) {
            this.conceptosService
                .deleteObject(this.selectedConceptos[i].idConcepto)
                .subscribe((data) => {
                    indexLista++;

                    if (indexLista == this.selectedConceptos.length) {
                        this.conceptosService.getAll().subscribe({
                            next: (data) => {
                                this.listConceptos = data.listado;
                            },
                        });
                        this.selectedConceptos = null;
                        this.appservie.msgInfoDetail(
                            'error',
                            'Eliminación',
                            'Se han eliminado todos los datos seleccionados'
                        );
                    }
                });
        }
    }

    editConceptos(doc: ConceptoDto) {
        this.conceptos = { ...doc };

        /*     if(doc.estadoConcetpto== 'ACTIVO'){
            doc.estado= true;
        }else{
            doc.estado= false;
        } */

        this.conceptosSelect.emit(doc);
    }

    deleteConceptos(doc: ConceptoDto) {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass:
                'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de eliminar ' + doc.idConcepto + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarConceptoSimple(doc);
            },
        });
    }

    async eliminarConceptoSimple(doc: ConceptoDto) {
        this.conceptosService.deleteObject(doc.idConcepto).subscribe((data) => {
            this.appservie.msgDelete();
            this.conceptosService.getAll().subscribe({
                next: (data) => {
                    this.listConceptos = data.listado;
                },
            });
        });
    }

    hideDialog() {
        this.submitted = false;
    }

    exportPdf() {
        let indexLista: number = 0;
        this.listConceptos.forEach((element) => {
            indexLista++;
            element.idConcepto = indexLista;
        });
        this.appservie.exportPdf(
            this.exportColumns,
            this.listConceptos,
            'Conceptos',
            'p'
        );
    }

    exportExcel() {
        let indexLista: number = 0;
        this.listConceptos.forEach((element) => {
            indexLista++;
            element.idConcepto = indexLista;
            element.idUsuarioConcepto = null;
            element.fechaConcepto = null;
        });
        this.appservie.exportExcel(this.listConceptos, 'Conceptos');
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

    llamarFuncion() {
        this.conceptocomponent.abrirmodal();
    }
}
