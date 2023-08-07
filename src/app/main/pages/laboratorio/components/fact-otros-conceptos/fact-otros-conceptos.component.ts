import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-fact-otros-conceptos',
  templateUrl: './fact-otros-conceptos.component.html',
  styleUrls: ['./fact-otros-conceptos.component.css']
})
export class FactOtrosConceptosComponent implements OnInit {
  modal: boolean;
  cedula: string;


  constructor(

    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Factura Otros Conceptos ' }]);
    }
  }

  onInput(event: any) {
    const input = event.target;
    const value = input.value;
  
    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
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
