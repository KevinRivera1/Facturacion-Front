import { Component, Input, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';

@Component({
  selector: 'app-factura-laboratorio-table',
  templateUrl: './factura-laboratorio-table.component.html',
  styleUrls: ['./factura-laboratorio-table.component.scss']
})
export class FacturaLaboratorioTableComponent implements OnInit {
  
  @Input() listfacturalaboratorio:  any [] = [];

  modal: boolean;
  loading: boolean;
  clienteSelect: DetalleFacturaDto;
  cols: any[];
  exportColumns: any[];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private detalleFacturaService: DetalleFacturaService,
    private facturaService: FacturaService,
    public appService: AppService,
    
   
   



  ) {
    
   
   }

  ngOnInit() {
    this.construirTabla();
    this.clienteSelect= new DetalleFacturaDto();
    
   // this.llenardetalleFacturalaboratorio();
  }

  construirTabla() {
    this.cols = [
        //{ field: 'idReciboCaja', header: 'Nro.RECIBO' },
        { field: 'codFactura', header: 'codFactura' },
        { field: 'nombreConsumidor', header: 'NOMBRE' },
        { field: 'rucConsumidor', header: 'Ruc' },
        { field: 'fechaFact', header: 'FECHA' },
        { field: 'nombreServ', header: 'sub total' },
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






  async llenardetalleFacturalaboratorio() {
    await this.facturaService.getAll().subscribe({
        next: (data) => {
            this.listfacturalaboratorio = data.listado;
            console.log('CORRECTO');
            console.log(this.listfacturalaboratorio);
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


  cargarfactura(clienteSelectDto: DetalleFacturaDto){
    this.clienteSelect= clienteSelectDto;
    this.abrirmodal();
    
  }


  abrirmodal() {
    this.modal = true;
}
cerrar() {

  this.modal = false;
  

}

filtrarFacturas(listfacturalaboratorio:any[]){
  this.listfacturalaboratorio = listfacturalaboratorio
}


exportExcel() {
  if (this.listfacturalaboratorio && this.listfacturalaboratorio.length > 0) {
      this.listfacturalaboratorio = this.listfacturalaboratorio.map((element, index) => {
          element.idFacturaDTO = index + 1;
          return element;
      });
      this.appService.exportExcel(this.listfacturalaboratorio, 'Facturas Laboratorio');
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
  if (this.listfacturalaboratorio && this.listfacturalaboratorio.length > 0) {
      this.listfacturalaboratorio = this.listfacturalaboratorio.map((element, index) => {
          element.idFacturaDTO = index + 1;
          return element;
      });
      this.appService.exportPdf(this.exportColumns, this.listfacturalaboratorio, 'Facturas Laboratorios', 'p'
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