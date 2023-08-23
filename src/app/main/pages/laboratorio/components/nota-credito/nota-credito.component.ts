import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { NotaCreditoDto } from '../../model/NotaCreditoDto';
import { NotaCreditoService } from '../../services/nota-credito.service';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { FormGroup } from '@angular/forms';
import { FormUtil } from '../../formUtil/FormUtil';

@Component({
  selector: 'app-nota-credito',
  templateUrl: './nota-credito.component.html',
  styleUrls: ['./nota-credito.component.css']
})
export class NotaCreditoComponent implements OnInit {
  @Input() listfacturaD:  any [] = [];
  @Output() facturaEmitter = new EventEmitter();
  facturas: FacturaDto[];
  proceso: string = 'conceptos';
  buscarFacturas: FormGroup;
  formUtil: FormUtil;

  modal: boolean;
  modal1: boolean;

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
    this.formUtil = new FormUtil(this.buscarFacturas);
  
  }

  get f() {
    return this.buscarFacturas.controls;
}

  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
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


  filtrarFacturas(listfacturaD:any[]){
    this.listfacturaD = listfacturaD
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





