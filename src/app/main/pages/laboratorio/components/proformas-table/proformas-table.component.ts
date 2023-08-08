import { Component, OnInit } from '@angular/core';
import { FacturaLaboratorioComponent } from '../factura-laboratorio/factura-laboratorio.component';

@Component({
  selector: 'app-proformas-table',
  templateUrl: './proformas-table.component.html',
  styleUrls: ['./proformas-table.component.css']
})
export class ProformasTableComponent implements OnInit {


  constructor(
    private facturaLaboratorioComponent: FacturaLaboratorioComponent
  ) { }

  ngOnInit() {
  }

  abrirmodal() {
    this.facturaLaboratorioComponent.modal2 = true;
}
cerrar() {

  this.facturaLaboratorioComponent.modal2 = false;

  

}
}
