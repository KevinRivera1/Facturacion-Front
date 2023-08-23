import { Component, Input, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { AppService } from 'src/app/_service/app.service';
import { severities } from 'src/app/_enums/constDomain';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { FacturaDto } from '../../model/Factura.dto';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-fact-otros-conceptos-table',
  templateUrl: './fact-otros-conceptos-table.component.html',
  styleUrls: ['./fact-otros-conceptos-table.component.css']
})
export class FactOtrosConceptosTableComponent implements OnInit {
  @Input() listfacturaotrosconceptos:  any [] = [];
 
  modal: boolean;
  clienteSelect: FacturaDto;
  cols: any[];
  loading: boolean;
  exportColumns: any[];

  constructor(
    private facturaService: FacturaService,
    public appService: AppService,
    
  ) { 
    
  }

  ngOnInit() {
    //this.llenarFacturalaboratorio();
    this.construirTabla();
  }

  
  construirTabla() {
    this.cols = [
        //{ field: 'idReciboCaja', header: 'Nro.RECIBO' },
        { field: 'codFactura', header: 'codFactura' },
        { field: 'nombreConsumidor', header: 'NOMBRE' },
        { field: 'rucConsumidor', header: 'Ruc' },
        { field: 'fechaFact', header: 'FECHA' },
        { field: 'subtotalFact', header: 'sub total' },
        { field: 'ivaFact', header: 'iva'},
        { field: 'totalFact', header: 'total factura' },
        { field: 'estadoSri', header: 'estado'}
    ];
    this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));
    this.loading = false;
}

  filtrarFacturas(listfacturaotrosconceptos:any[]){
    this.listfacturaotrosconceptos = listfacturaotrosconceptos
  }

  
  async llenarFacturalaboratorio() {
    await this.facturaService.getAll().subscribe({
        next: (data) => {
            this.listfacturaotrosconceptos = data.listado;
            console.log('CORRECTO');
            console.log(this.listfacturaotrosconceptos);
        },
        complete: () => {
            this.appService.msgInfoDetail(
                severities.INFO,
                'INFO',
                'Datos Cargados exitosamente' ,
                500
            );
        },
        error: (error) => {
            this.appService.msgInfoDetail(
                severities.ERROR,
                'ERROR',
                error.error
            );
        },
    });
  }

  


  cerrar() {

    this.modal = false;
    
  
  }
  cargarfactura(clienteSelectDto: FacturaDto){
    this.clienteSelect= clienteSelectDto;
    this.abrirmodal();
    
  }
  abrirmodal() {
    this.modal = true;
}

clear(table: Table) {
  table.clear();
}

exportExcel() {
  if (this.listfacturaotrosconceptos && this.listfacturaotrosconceptos.length > 0) {
      this.listfacturaotrosconceptos = this.listfacturaotrosconceptos.map((element, index) => {
          element.idFactura = index + 1;
          return element;
      });
      this.appService.exportExcel(this.listfacturaotrosconceptos, 'Factura');
  } else {
      console.log('No hay datos para exportar a Excel.');
      this.appService.msgInfoDetail(
          severities.ERROR,
          'ERROR',
          'No se encontraron registros para generar el Excel',
          700
      );
  }
}
exportPdf() {
  if (this.listfacturaotrosconceptos && this.listfacturaotrosconceptos.length > 0) {
      this.listfacturaotrosconceptos = this.listfacturaotrosconceptos.map((element, index) => {
          element.idFactura = index + 1;
          return element;
      });
      this.appService.exportPdf(this.exportColumns, this.listfacturaotrosconceptos, 'Factura', 'p'
      );
  } else {
      console.log('No hay datos para exportar a PDF.');
      this.appService.msgInfoDetail(
          severities.ERROR,
          'ERROR',
          'No se encontraron registros para generar el PDF',
          700
      );
  }
}

}
