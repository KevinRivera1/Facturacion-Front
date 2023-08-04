import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-lista-fact-table',
  templateUrl: './lista-fact-table.component.html',
  styleUrls: ['./lista-fact-table.component.css']
})
export class ListaFactTableComponent implements OnInit {

  display: boolean;

  constructor(

    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

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
    this.display = false;
}


  abrirmodal() {
    this.display = true;
}


}
