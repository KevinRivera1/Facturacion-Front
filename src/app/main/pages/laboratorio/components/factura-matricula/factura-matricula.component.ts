import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura-matricula',
  templateUrl: './factura-matricula.component.html',
  styleUrls: ['./factura-matricula.component.css']
})
export class FacturaMatriculaComponent implements OnInit {
  modal: boolean;

  constructor() { }

  ngOnInit() {
  }


  cerrar() {

    this.modal = false;
    

}

abrirmodal() {
    this.modal = true;
}

}
