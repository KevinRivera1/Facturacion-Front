import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-nota-credito',
  templateUrl: './nota-credito.component.html',
  styleUrls: ['./nota-credito.component.css']
})
export class NotaCreditoComponent implements OnInit {

  modal: boolean;
  modal1: boolean;
l

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


  //Abrir el modal
  abrirmodal() {
    this.modal = true;
  }
  abrirmodal1() {
    this.modal1 = true;
  }

  cerrar() {
    this.modal = false;
    this.modal1 = false;
  }
}




// busquedaForm: FormGroup;

// maxLengthR: number = 13;
// maxLengthC: number = 10;

// constructor(private breadcrumbService: BreadcrumbService) {
//     {
//         this.breadcrumbService.setItems([{ label: 'Recibo Caja ' }]);
//     }
// }

// ngOnInit() {}

// cancelar() {
//     // this.setearForm();
//     this.modal = false;
// }

// onInputR(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     const value = inputElement.value;
//     if (value.length > this.maxLengthR) {
//         inputElement.value = value.slice(0, this.maxLengthR); // Truncar el valor a la longitud máxima
//         this.busquedaForm.controls['Cantidad'].setValue(inputElement.value); // Actualizar el valor del formulario
//     }
// }

// onInputC(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     const value = inputElement.value;
//     if (value.length > this.maxLengthC) {
//         inputElement.value = value.slice(0, this.maxLengthC); // Truncar el valor a la longitud máxima
//         this.busquedaForm.controls['Cantidad'].setValue(inputElement.value); // Actualizar el valor del formulario
//     }
// }

