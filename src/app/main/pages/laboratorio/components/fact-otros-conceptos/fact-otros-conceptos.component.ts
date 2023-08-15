import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormaPagoService } from '../../services/formaPago.service';

@Component({
  selector: 'app-fact-otros-conceptos',
  templateUrl: './fact-otros-conceptos.component.html',
  styleUrls: ['./fact-otros-conceptos.component.css']
})
export class FactOtrosConceptosComponent implements OnInit {
  modal: boolean;
  cedula: string;
  modal2: boolean;
  modal3: boolean;
  modal1: boolean; //Visibilidad de un modal
  busquedaForm: FormGroup;

  maxLengthR: number = 13;
  maxLengthC: number = 10;
  modallista: boolean;

  displayModal: boolean = false;

  selectedOption: string = '';

  data: string = '';
  
  
  constructor(
    private breadcrumbService: BreadcrumbService,
   

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
    this.modal2 = false;
    this.modal3 = false;

    this.modallista = false;
  }

  cerrar1() {
    this.modal1 = false;
    this.modal2 = false;
    this.modal3 = false;

    this.modallista = false;
  }

  abrirmodal() {
    this.modal = true;
  }
  abrirmodal1() {
    this.modal1 = true;
  }
  // abrirmodal2() {
  //   this.modal2 = true;
  // }
  abrirmodal3() {
    this.modal3 = true;
  }
  //Cerrar el modal y restablecer el formulario

  abrirmodalista() {
    this.modallista = true;
  }

  modalOpen() {
    //this.displayAnulacioModal.onDisplayForm()
    this.displayModal = true;
    console.log('abrir modal desde tabla');
}

closeModal() {
    this.displayModal = false;
    console.log('cerrando modal');
}

buscarU(): void {
  switch (this.selectedOption) {
    case "Estudiante":
      this.data = "Estudiante";
      break;
    case "Cliente":
      this.data = "Cliente";
      break;
    case "Empleado EPN":
      this.data = "Empleado EPN";
      break;
    default:
      this.data = ""; // Valor por defecto si ninguna opción está seleccionada
      break;
  }
  this.modal2 = true;
  console.log(this.data);
}


}
