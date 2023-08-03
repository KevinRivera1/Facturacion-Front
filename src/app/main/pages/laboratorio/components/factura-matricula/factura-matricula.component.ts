import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura-matricula',
  templateUrl: './factura-matricula.component.html',
  styleUrls: ['./factura-matricula.component.css']
})
export class FacturaMatriculaComponent implements OnInit {
  modal: boolean;
  cedula: string;


  constructor() { }

  ngOnInit() {
  }




  onInput(event: any) {
    const input = event.target;
    const value = input.value;
  
    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }
  cerrar() {

    this.modal = false;
    

}

abrirmodal() {
    this.modal = true;
}

}
