import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PuntoDto } from "../../model/Punto-fac.dto";
import { PuntoFacService } from "../../services/punto-fact.service";
import { FileService } from "../../../../../_service/utils/file.service";
import { AppService } from "../../../../../_service/app.service";
import { ConfirmationService } from "primeng/api";
import { Table } from "primeng/table";
import { PuntoFacturacionComponent } from '../punto-facturacion/punto-facturacion.component';


@Component({
    selector: 'app-punto-facturacion-table',
    templateUrl: './punto-facturacion-table.component.html',
    styleUrls: ['./punto-facturacion-table.component.css']
})
export class PuntoFacturacionTableComponent implements OnInit {


    proceso: string = 'punto-fac';
    @Input() listPunto: PuntoDto[];
    @Output() puntoSelect = new EventEmitter();


    puntoFac: PuntoDto;
    selectedpuntoFac: PuntoDto[];
    submitted: boolean;
    loading: boolean;


    exportColumns: any[];

    cols: any[];

    //   @Input() listUsuario: UsuarioRelDto[];

    //   selectedUsuario:UsuarioRelDto[];




    constructor(

        private puntoFacService: PuntoFacService,
        private fileService: FileService,
        private appservie: AppService,
        private confirmationService: ConfirmationService,
        private puntoFacturacionComponent: PuntoFacturacionComponent

    ) { }


    ngOnInit(): void {

        this.construirTabla();
        // this.Usuarios()
    }


    construirTabla() {

        this.cols = [
            { field: 'idPuntoFacturacion', header: 'Nro.' },
            { field: 'nombrePuntoFact', header: 'NOMBRE.' },
            { field: 'secuencialPuntoFact', header: 'SECUENCIAL.' },
            { field: 'estadoPuntoFact', header: 'ESTADO.' },

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
            this.puntoFacService.getAll().subscribe(res => {
                this.listPunto = res;
                console.log("LLAMADA")
                console.log(this.listPunto);
                this.loading = false;
            })
        }, 1000);
    }

    registrarNuevo() {
        // @ts-ignore
        this.puntoFac = new PuntoDto();
        this.submitted = false;
    }



    deleteSelectedPunto() {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de Eliminar los elementos seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarPuntosSelected();
            }
        });
    }

    //   async Usuarios(){
    //     await this.puntoFacService.getAllUs().subscribe({
    //         next: data => {
    //             this.listUsuario = data.listado
    //             console.log("CORRECTO");
    //             console.log(this.listUsuario);
    //         },

    //     })
    // }

    // loadDataUs(event) {
    //     this.loading = true;
    //     setTimeout(() => {
    //         this.puntoFacService.getAllUs().subscribe(res => {
    //             this.listUsuario = res;
    //             console.log("LLAMADA")
    //             console.log(this.listUsuario);
    //             this.loading = false;
    //         })
    //     }, 1000);
    // }


    eliminarPuntosSelected() {
        let indexLista: number = 0;
        for (let i = 0; i < this.selectedpuntoFac.length; i++) {
            this.puntoFacService.deleteObject(this.selectedpuntoFac[i].idPuntoFacturacion).subscribe(
                data => {
                    indexLista++;

                    if (indexLista == this.selectedpuntoFac.length) {
                        this.puntoFacService.getAll().subscribe({
                            next: data => {
                                this.listPunto = data.listado;
                                this.selectedpuntoFac = null;
                                this.appservie.msgInfoDetail('error', 'Eliminación', 'Se han eliminado todos los datos seleccionados');
                            }
                        });
                    }
                },
                error => {
                    indexLista++;

                    if (indexLista == 1) {
                        this.puntoFacService.getAll().subscribe({
                            next: data => {
                                this.listPunto = data.listado;
                                this.selectedpuntoFac = null;
                                this.appservie.msgInfoDetail('error', 'Eliminación', 'Este punto de facturación está siendo usado por otra tabla.');
                            }
                        });
                    }
                }
            );
        }
    }

    // refreshPage() {
    //     setTimeout(() => {
    //         window.location.reload();
    //         // this.appservie.msgInfoDetail('error', 'Eliminación', 'Este punto de facturación está siendo usado por otra tabla.');
    //         // this.appservie.msgInfoDetail('error', 'Eliminación', 'Se han eliminado todos los datos seleccionados');
    //     },);
    // }

    editPunto(doc: PuntoDto) {
        this.puntoFac = { ...doc };

        this.puntoSelect.emit(doc);
    }

    deletePunto(doc: PuntoDto) {
        this.confirmationService.confirm({
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-outlined p-button-rounded p-button-success',
            rejectButtonStyleClass: 'p-button-outlined p-button-rounded p-button-danger',
            message: 'Esta seguro de eliminar el Punto De Facturación con el nombre: ' + doc.nombrePuntoFact + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eliminarPuntoSimple(doc);
            }
        });
    }



    async eliminarPuntoSimple(doc: PuntoDto) {
        this.puntoFacService.deleteObject(doc.idPuntoFacturacion).subscribe(
            data => {
                this.appservie.msgDelete();
                this.puntoFacService.getAll().subscribe({
                    next: data => {
                        this.listPunto = data.listado;
                    }
                });
            },
            error => {
                this.appservie.msgInfoDetail('error', 'Eliminación', 'Este punto de facturación está siendo usado por otra tabla.');
            }
        );
    }




    hideDialog() {
        this.submitted = false;
    }

    exportPdf() {

        let indexLista: number = 0;
        this.listPunto.forEach(element => {
            indexLista++;
            element.idPuntoFacturacion = indexLista;
            //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
        });
        this.appservie.exportPdf(this.exportColumns, this.listPunto, 'punto-fac', "p");
    }

    exportExcel() {
        let indexLista: number = 0;
        this.listPunto.forEach(element => {
            indexLista++;
            element.idPuntoFacturacion = indexLista;
            element.idUsuarioPuntoFact = null;
            //  element.formatDate=new Date(element.fechaBancos).toLocaleDateString()+" "+new Date(element.fechaBancos).toLocaleTimeString();
            element.fechaCreacionPuntoFact = null;
        });
        this.appservie.exportExcel(this.listPunto, 'punto-fac');
    }

    descargarArchivo(fileName: string) {
        try {
            this.fileService.getFileByName(fileName, this.proceso);
        } catch (error) {
            this.appservie.msgInfoDetail('error', 'Error', 'Error al descargar el archivo');
        }
    }

    llamarmodal() {
        this.puntoFacturacionComponent.abrimodal()
    }


    //   combineLists() {
    //     const combinedList = [];

    //      Recorrer cada objeto de listPunto
    //     for (const punto of this.listPunto) {
    //          Buscar el objeto de listUsuario que corresponde al idUsuario del punto
    //       const usuario = this.listUsuario.find(u => u.idUsuario === punto.idUsuarioRel);

    //          Combinar las propiedades de ambos objetos en un nuevo objeto
    //       const combinedObject = { ...punto, ...usuario };

    //          Agregar el nuevo objeto a la lista combinada
    //       combinedList.push(combinedObject);
    //     }

    //     return combinedList;
    //   }

}