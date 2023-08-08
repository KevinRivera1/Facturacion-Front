import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ListFormaPagoComponent } from '../list-forma-pago/list-forma-pago.component';

@Component({
  selector: 'app-factura-matricula',
  templateUrl: './factura-matricula.component.html',
  styleUrls: ['./factura-matricula.component.css']
})
export class FacturaMatriculaComponent implements OnInit {
  modal: boolean;
  cedula: string;
modal2: boolean;
  modal3: boolean;
  modal1: boolean; //Visibilidad de un modal
  busquedaForm: FormGroup;
  modallista: boolean;
  
  displayModal: boolean = false;
  
  maxLengthR: number = 13;
  maxLengthC: number = 10;



  constructor(private breadcrumbService: BreadcrumbService) {
    {
        this.breadcrumbService.setItems([{ label: 'Recibo Caja ' }]);
    }
}

  ngOnInit():void {
    //this.iniciarForms();
  }

  /*   iniciarForms() {
    this.formFacturaLaboratorio = this.formBuilder.group({
        factura_no: new FormControl(
            '',
            Validators.compose([Validators.required])
        ),
        nombrecl: new FormControl(
            '',
            Validators.compose([Validators.required])
        ),
        estado: new FormControl(
            true,
            Validators.compose([Validators.requiredTrue])
        ),
        ruc: new FormControl(
          '',
          Validators.compose([Validators.required])
      ),
      cedula: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ),
    });

    this.token = JSON.parse(this.tokenService.getResponseAuth());
    //  this.f.idFormaPago.setValue(this.token.id)
} */



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
abrirmodal2() {
  this.modal2 = true;
}
abrirmodal3() {
  this.modal3 = true;
}
abrirmodalista() {
  this.modallista = true;
}
//Cerrar el modal y restablecer el formulario
cerrar() {
  // this.f.estadoCentroCosto.disable();
  // this.setearForm();

  this.modal = false;
  this.modal1 = false;
  this.modal2 = false;
  this.modal3 = false;
  this.modallista = false;
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


}
