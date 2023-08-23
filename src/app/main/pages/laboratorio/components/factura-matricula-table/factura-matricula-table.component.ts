import { Component, Input, OnInit } from '@angular/core';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { ReciboCajaDto } from '../../model/reciboCajaDto';

@Component({
  selector: 'app-factura-matricula-table',
  templateUrl: './factura-matricula-table.component.html',
  styleUrls: ['./factura-matricula-table.component.css']
})
export class FacturaMatriculaTableComponent implements OnInit {
  proceso: string = 'formapago';
  @Input() listFactura: any[] = [];
  loading: boolean;

  modal: boolean;
  clienteSelect: DetalleFacturaDto;
  cols: { field: string; header: string; }[];
  exportColumns: { title: string; dataKey: string; }[];

  constructor(
    private detalleFacturaService: DetalleFacturaService,
    private facturaService: FacturaService,
    public appService: AppService,

  ) { }

  async llenarFacturaMatricula() {
    await this.detalleFacturaService.getAll().subscribe({
      next: (data) => {
        this.listFactura = data.listado;
        console.log('CORRECTO');
        console.log(this.listFactura);
      },
      complete: () => {
        this.appService.msgInfoDetail(
          severities.INFO,
          'INFO',
          'Datos Cargados exitosamente',
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

  loadData(event) {
    this.loading = true;
    setTimeout(() => {
      this.detalleFacturaService.getAll().subscribe((res) => {
        this.listFactura = res;
        console.log('LLAMADA');
        console.log(this.listFactura);
        this.loading = false;
      });
    }, 1000);
    
  }

  cargarfactura(clienteSelectDto: DetalleFacturaDto) {
    this.clienteSelect = clienteSelectDto;
    this.abrirmodal();

  }

  abrirmodal() {
    this.modal = true;
  }
  cerrar() {

    this.modal = false;


  }

  ngOnInit() {
    // this.llenarFacturaMatricula();
    this.clienteSelect = new DetalleFacturaDto();
    this.construirTabla();

  }

  filtrarFactura(listFactura: any[]) {
    this.listFactura = listFactura
  }

  construirTabla() {
    this.cols = [
        //{ field: 'idReciboCaja', header: 'Nro.RECIBO' },
        { field: 'codRcaja', header: 'Nro.RECIBO' },
        { field: 'nombreConsumidorRc', header: 'NOMBRE.' },
        { field: 'rucConsumidorRc', header: 'Ruc.' },
        { field: 'fechaRcaja', header: 'FECHA.' },
        { field: 'totalRc', header: 'TOTAL' },
        { field: 'idEstadoRc', header: 'ESTADO' },
        { field: 'observacionRc', header: 'MOTIVO' },
    ];
    this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));
    this.loading = false;
}

  exportPdf() {
    if (this.listFactura && this.listFactura.length > 0) {
        this.listFactura = this.listFactura.map((element, index) => {
            element.idCajaRc = index + 1;
            return element;
        });
        this.appService.exportPdf(this.exportColumns, this.listFactura, 'Anular Recibo Caja', 'p'
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
