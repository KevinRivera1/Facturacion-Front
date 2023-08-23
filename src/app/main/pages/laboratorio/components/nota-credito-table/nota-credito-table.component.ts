import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AppService } from 'src/app/_service/app.service';
import { Table } from 'primeng/table';
import { NotaCreditoDto } from '../../model/NotaCreditoDto';
import { NotaCreditoService } from '../../services/nota-credito.service';
import { NotaCreditoComponent } from '../nota-credito/nota-credito.component';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-nota-credito-table',
  templateUrl: './nota-credito-table.component.html',
  styleUrls: ['./nota-credito-table.component.css']
})
export class NotaCreditoTableComponent implements OnInit {

  proceso: string = 'notacredito';

  @Input() listNotaCreditos: NotaCreditoDto[];
  @Output() notacreditosSelect = new EventEmitter();
  notacreditos: NotaCreditoDto;
  selectedNotaCreditos: NotaCreditoDto[];

  @Input() listFactura: FacturaDto[];
  @Output() facturasSelect = new EventEmitter();
  facturas: FacturaDto;
  selectedFacturas: FacturaDto[];

  submitted: boolean;
  loading: boolean;
  combinedData: any[];

  exportColumns: any[];

  cols: any[];

  constructor(
    private notacreditoComponent: NotaCreditoComponent,
    private notacreditoService: NotaCreditoService,
    private facturaService: FacturaService,
    private appservie: AppService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.construirTabla();    
  }

  construirTabla() {
    this.cols = [
      { field: 'codNc', header: 'Nota C No.' },
      { field: 'codFactura', header: 'Factura N.' },
      { field: 'nombreConsumidor', header: 'Cliente' },
      { field: 'rucConsumidor', header: 'RUC/CI' },
      { field: 'fechaFact', header: 'Fecha' },
      { field: 'totalFact', header: 'Valor' },
      { field: 'idEstadoNc', header: 'Estado' }
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
      this.notacreditoService.getAll().subscribe((res) => {
        this.listNotaCreditos = res;
        console.log('LLAMADA');
        console.log(this.listNotaCreditos);
        this.loading = false;
      });
    }, 1000);
  }

  loadData1(event) {
    this.loading = true;
    setTimeout(() => {
      this.facturaService.getAll().subscribe((res) => {
        this.listFactura = res;
        console.log('LLAMADA');
        console.log(this.listFactura);
        this.loading = false;
      });
    }, 1000);
  }

  

  registrarNuevo() {
    // @ts-ignore
    this.notacreditos = new NotaCreditoDto();
    this.submitted = false;
  }

  deleteSelectedNotasC() {
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
        this.eliminarNotasSelected();
      },
    });
  }

  eliminarNotasSelected() {
    let indexLista: number = 0;
    for (let i = 0; i < this.selectedNotaCreditos.length; i++) {
      this.notacreditoService
        .deleteObject(this.selectedNotaCreditos[i].idNotaCredito)
        .subscribe((data) => {
          indexLista++;

          if (indexLista == this.selectedNotaCreditos.length) {
            this.notacreditoService.getAll().subscribe({
              next: (data) => {
                this.listNotaCreditos = data.listado;
              },
            });
            this.selectedNotaCreditos = null;
            this.appservie.msgInfoDetail(
              'error',
              'Eliminación',
              'Se han eliminado todos los datos seleccionados'
            );
          }
        });
    }
  }


  deleteNotasC(doc: NotaCreditoDto) {
    this.confirmationService.confirm({
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass:
        'p-button-outlined p-button-rounded p-button-success',
      rejectButtonStyleClass:
        'p-button-outlined p-button-rounded p-button-danger',
      message: 'Esta seguro de eliminar el Concepto '
        //+ doc.nombreConcepto 
        + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarNotaSimple(doc);
      },
    });
  }

  async eliminarNotaSimple(doc: NotaCreditoDto) {
    this.notacreditoService.deleteObject(doc.idNotaCredito).subscribe((data) => {
      this.appservie.msgDelete();
      this.notacreditoService.getAll().subscribe({
        next: (data) => {
          this.listNotaCreditos = data.listado;
        },
      });
    });
  }

  hideDialog() {
    this.submitted = false;
  }

  llamarFuncion() {
    this.notacreditoComponent.abrirmodal();
  }
}
