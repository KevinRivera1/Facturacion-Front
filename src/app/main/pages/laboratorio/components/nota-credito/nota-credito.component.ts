import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { NotaCreditoDto } from '../../model/NotaCreditoDto';
import { NotaCreditoService } from '../../services/nota-credito.service';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { DetalleFacturaService } from '../../services/detalleFactura.service';

@Component({
  selector: 'app-nota-credito',
  templateUrl: './nota-credito.component.html',
  styleUrls: ['./nota-credito.component.css']
})
export class NotaCreditoComponent implements OnInit {

  modal: boolean;
  modal1: boolean;
  proceso: string = 'conceptos';
  listNotas: NotaCreditoDto[] = [];
  listFacturas: FacturaDto[] = [];
  listDetalles: DetalleFacturaDto[] = [];

  constructor(

    private breadcrumbService: BreadcrumbService,
    public appService: AppService,
    private notasService: NotaCreditoService,
    private facturasService: FacturaService,
    private detallefacturaService: DetalleFacturaService,

  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

  ngOnInit() {
    this.llenarListFacturas();
    this.llenarListNotas();
    this.llenarListDetalle();
  }

  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }

  async llenarListNotas() {
    await this.notasService.getAll().subscribe({
      next: (data) => {
        this.listNotas = data.listado;
        console.log('CORRECTO');
        console.log(this.listNotas);
      },
    });
  }

  async llenarListFacturas() {
    await this.facturasService.getAll().subscribe({
      next: (data) => {
        this.listFacturas = data.listado;
        console.log('CORRECTO');
        console.log(this.listFacturas);
      },
    });
  }

  async llenarListDetalle() {
    await this.detallefacturaService.getAll().subscribe({
      next: (data) => {
        this.listDetalles = data.listado;
        console.log('CORRECTO');
        console.log(this.listDetalles);
      },
    });
  }

  //Abrir el modal
  abrirmodal() {
    this.modal = true;
  }
  abrirmodal1() {
    this.modal1 = true;
  }

  cerrar() {
    this.modal = false;
    this.modal1 = false;
  }
}





