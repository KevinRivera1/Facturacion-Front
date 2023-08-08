import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura-laboratorio-table',
  templateUrl: './factura-laboratorio-table.component.html',
  styleUrls: ['./factura-laboratorio-table.component.scss']
})
export class FacturaLaboratorioTableComponent implements OnInit {
  

  modal: boolean;

  constructor() { }

  ngOnInit() {
  }


  abrirmodal() {
    this.modal = true;
}
cerrar() {

  this.modal = false;
  

}
}
