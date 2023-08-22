import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { Table } from 'primeng/table';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
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
  facturaSelect:FacturaDto;

  @Input() listDetalle: DetalleFacturaDto[];
  @Output() detallesSelect = new EventEmitter();
  detalles: DetalleFacturaDto;
  selectedDetalles: DetalleFacturaDto[];
  detalleSelect: DetalleFacturaDto;


  submitted: boolean;
  loading: boolean;
  exportColumns: any[];
  @Input() facturasConDetalles: any[] = [];

  cols: any[];

  modal: boolean;

  constructor(
    private facturaService: FacturaService,
    public appService: AppService,
    private detallefacturaService: DetalleFacturaService,
    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

  ngOnInit() {
    this.construirTabla();
    this.construirTablaD();
    this.facturaSelect= new FacturaDto();
    this.detalleSelect= new DetalleFacturaDto();
    this.prepararDatosFacturasConDetalles();
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
      { field: 'idFactura', header: 'ID Factura' },
      { field: 'estadoServ', header: 'ID Detalle' },
      { field: 'idProforma', header: 'ID Proforma' },
      { field: 'rucConsumidor', header: 'CI/RUC' },
      { field: 'nombreConsumidor', header: 'Cliente' },
      { field: 'fechaFact', header: 'Fecha' },
      { field: 'totalFact', header: 'Total' },
      { field: 'idEstadoFact', header: 'Estado' }
    ];
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
    this.loading = false;
  }

  construirTablaD() {
    this.cols = [
      { field: 'idConcepto', header: 'Codigo' },
      // { field: 'idProforma', header: 'ID Proforma' },
      // { field: 'rucConsumidor', header: 'CI/RUC' },
      // { field: 'nombreConsumidor', header: 'Cliente' },
      // { field: 'fechaFact', header: 'Fecha' },
      // { field: 'totalFact', header: 'Total' },
      // { field: 'idEstadoFact', header: 'Estado' }
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

   cargarFactura(facturaSelectDto: FacturaDto) {
    this.facturaSelect = facturaSelectDto;
    this.abrirmodal();
  }
  

  cargarDetalle(detalleSelectDto: DetalleFacturaDto) {
    this.detalleSelect = detalleSelectDto;
    this.abrirmodal();
  }

  prepararDatosFacturasConDetalles() {
    this.facturasConDetalles = [];
  
    for (const factura of this.listFactura) {
      const detallesFactura = this.listDetalle.filter(detalle => detalle.idFacturaDTO.idFactura === factura.idFactura);
      
      this.facturasConDetalles.push({
        factura: factura,
        detalles: detallesFactura
      });
    }
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

  loadData1(event) {
    this.loading = true;
    setTimeout(() => {
        this.detallefacturaService.getAll().subscribe((res) => {
            this.listDetalle = res;
            console.log('LLAMADA');
            console.log(this.listDetalle);
            this.loading = false;
        });
    }, 1000);
}


  registrarNuevo() {
    // @ts-ignore
    this.facturas = new FacturaDto();
    this.detalles = new DetalleFacturaDto();
    this.submitted = false;
  }


  cerrar() {
    this.modal = false;
}


  abrirmodal() {
    this.modal = true;
}


}
