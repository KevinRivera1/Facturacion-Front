import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-recibo-caja',
  templateUrl: './recibo-caja.component.html',
  styleUrls: ['./recibo-caja.component.scss']
})
export class ReciboCajaComponent implements OnInit {
  
  modal: boolean;                             //Visibilidad de un modal

  constructor(
    private breadcrumbService: BreadcrumbService  ){{
      this.breadcrumbService.setItems([{ label: 'Recibo Caja ' }]);
    }
  }


  ngOnInit() {
  }

  cancelar() {
    // this.setearForm();
    this.modal = false;
}

  //Abrir el modal
  abrirmodal() {
      this.modal = true;
  }

  //Cerrar el modal y restablecer el formulario
  cerrar() {
    // this.f.estadoCentroCosto.disable(); 
      // this.setearForm();
      
      this.modal = false;
  }
}
