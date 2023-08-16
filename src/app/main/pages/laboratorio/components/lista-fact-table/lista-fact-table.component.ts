import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { AppService } from 'src/app/_service/app.service';

@Component({
  selector: 'app-lista-fact-table',
  templateUrl: './lista-fact-table.component.html',
  styleUrls: ['./lista-fact-table.component.css']
})
export class ListaFactTableComponent implements OnInit {

  @Input() listFactura: FacturaDto[];
  @Output() facturasSelect = new EventEmitter();
  facturas: FacturaDto;
  selectedFacturas: FacturaDto[];

  submitted: boolean;
  loading: boolean;
  exportColumns: any[];

  cols: any[];

  modal: boolean;

  constructor(
    private facturaService: FacturaService,
    private appservie: AppService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

  ngOnInit() {
    this.construirTabla();
  }
  
  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }

  construirTabla() {
    this.cols = [
      { field: '', header: 'ID Factura' },
      { field: '', header: 'ID Proforma' },
      { field: '', header: 'CI/RUC' },
      { field: '', header: 'Cliente' },
      { field: '', header: 'Fecha' },
      { field: '', header: 'Total' },
      { field: '', header: 'Estado' }
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
    this.facturas = new FacturaDto();
    this.submitted = false;
  }


  cerrar() {
    this.modal = false;
}


  abrirmodal() {
    this.modal = true;
}


}
