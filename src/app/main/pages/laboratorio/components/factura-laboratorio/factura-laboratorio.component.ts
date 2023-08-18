import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { TokenDto } from 'src/app/_dto/token-dto';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ProformasTableComponent } from '../proformas-table/proformas-table.component';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';
import { FacturaDto } from '../../model/Factura.dto';
import { AppService } from 'src/app/_service/app.service';



@Component({
  selector: 'app-factura-laboratorio',
  templateUrl: './factura-laboratorio.component.html',
  styleUrls: ['./factura-laboratorio.component.scss']
})
export class FacturaLaboratorioComponent implements OnInit {


  @Output() facturalaboratorioEmitter = new EventEmitter();
  @Input() listEstado: FacturaDto[];

  laboratorio: FacturaDto[];
  modal: boolean;
  modal2: boolean;
  formFacturaLaboratorio: FormGroup;
  token: TokenDto;
  cedula: string;
  displayModal: boolean;
  listfacturalaboratorio: FacturaDto[] = [];
  selectedestado: FacturaDto[];



  
  constructor(

    private breadcrumbService: BreadcrumbService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    public appService: AppService,
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Factura Laboratorio ' }]);
    }
  }

  ngOnInit():void {
    this.llenarFacturalaboratorio();
    this.iniciarForms();
   
   
  }

   iniciarForms() {
    this.formFacturaLaboratorio = this.formBuilder.group({
      codFactura: new FormControl(
            '',
            Validators.compose([Validators.required])
        ),
        nombreConsumidor: new FormControl(
            '',
            Validators.compose([Validators.required])
        ),
        fechaFact: new FormControl(
            true,
            Validators.compose([Validators.required])
        ),
        rucConsumidor: new FormControl(
          '',
          Validators.compose([Validators.required])
      ),
      estadoSri: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ),
      idFactura: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ),
    });

   // this.token = JSON.parse(this.tokenService.getResponseAuth());
    //  this.f.idFormaPago.setValue(this.token.id)
} 
async llenarFacturalaboratorio() {
  await this.facturaService.getAll().subscribe({
      next: (data) => {
          this.listEstado = data.listado;
          console.log('CORRECTOESTADO');
          console.log(this.listEstado);
      }
  });
}


filtrarFacturas() {
  const formData = this.formFacturaLaboratorio.value;
  // Llamada al servicio para filtrar los datos
  this.facturaService.getAll().subscribe((response) => {
      const data = response.listado; // Accedemos a la propiedad listado
      if (Array.isArray(data)) {
          const facturasFiltradas = data.filter((factura) => {
              return (
                  factura.codFactura.includes(formData.codFactura) &&
                  factura.nombreConsumidor.includes(formData.nombreConsumidor) &&
                  factura.rucConsumidor.includes(formData.rucConsumidor) &&
                  factura.estadoSri.includes(formData.estadoSri)

              );
          });

          // Emitir los facturas filtradas al componente padre
          this.facturalaboratorioEmitter.emit(facturasFiltradas);
          console.log('facturas filtradas', facturasFiltradas)
      } else {
          console.error('Los datos no son un array:', data);
      }
  });
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

cerrarmodal2() {

  this.modal2 = false;

}

abrirmodal() {
    this.modal = true;
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


estados: SelectItem[] = [

  { label: 'Anulada NC', value: 'anulada_nc' },
  { label: 'Pagada', value: 'pagada' },
];

}
