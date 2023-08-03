import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenDto } from 'src/app/_dto/token-dto';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-factura-laboratorio',
  templateUrl: './factura-laboratorio.component.html',
  styleUrls: ['./factura-laboratorio.component.css']
})
export class FacturaLaboratorioComponent implements OnInit {


  modal: boolean;
  formFacturaLaboratorio: FormGroup;
  token: TokenDto;
  cedula: string;

  constructor(

    private breadcrumbService: BreadcrumbService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Factura Laboratorio ' }]);
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


  cerrar() {

    this.modal = false;
    

}

abrirmodal() {
    this.modal = true;
}
}
