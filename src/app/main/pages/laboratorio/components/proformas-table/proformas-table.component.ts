import { Component, OnInit } from '@angular/core';
import { FacturaLaboratorioComponent } from '../factura-laboratorio/factura-laboratorio.component';

@Component({
  selector: 'app-proformas-table',
  templateUrl: './proformas-table.component.html',
  styleUrls: ['./proformas-table.component.css']
})
export class ProformasTableComponent implements OnInit {
  modal2: boolean;

  constructor(
  ) { }

  ngOnInit() {
  }

  abrirmodal() {
    this.modal2 = true;
}
cerrar() {

  this.modal2 = false;

  

}
}
