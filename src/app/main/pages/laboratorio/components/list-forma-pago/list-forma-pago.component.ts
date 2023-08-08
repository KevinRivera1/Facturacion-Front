import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-list-forma-pago',
  templateUrl: './list-forma-pago.component.html',
  styleUrls: ['./list-forma-pago.component.css']
})
export class ListFormaPagoComponent implements OnInit {
  pago: boolean;

  constructor(

    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Factura Otros Conceptos ' }]);
    }
  }


  ngOnInit() {
  }

  cerrar() {

    this.pago = false;
  }

  abrirmodal() {
    this.pago = true;
  }

}
