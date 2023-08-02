import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-factura-laboratorio',
  templateUrl: './factura-laboratorio.component.html',
  styleUrls: ['./factura-laboratorio.component.css']
})
export class FacturaLaboratorioComponent implements OnInit {


  modal: boolean;

  constructor(

    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Factura Laboratorio ' }]);
    }
  }

  ngOnInit() {
  }


  cerrar() {

    this.modal = false;
    

}

abrirmodal() {
    this.modal = true;
}
}
