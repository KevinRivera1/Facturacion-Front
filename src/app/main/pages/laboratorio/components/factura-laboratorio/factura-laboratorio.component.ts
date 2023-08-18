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
import { ResponseGenerico } from 'src/app/_dto/response-generico';



@Component({
  selector: 'app-factura-laboratorio',
  templateUrl: './factura-laboratorio.component.html',
  styleUrls: ['./factura-laboratorio.component.scss']
})
export class FacturaLaboratorioComponent implements OnInit {


  @Output() facturalaboratorioEmitter = new EventEmitter();
  @Input() listEstado: FacturaDto[];

  laboratorio: FacturaDto[];
  response: ResponseGenerico;
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
        rucConsumidor: new FormControl(
          '',
          Validators.compose([Validators.required])
      ),
      estadoSri: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ),
      fechaDesde: [''],
      fechaHasta: [''],
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


/* async filtrarFacturas() {
  const formData = this.formFacturaLaboratorio.value;
  // Llamada al servicio para filtrar los datos
  await this.facturaService.getAll().subscribe((response) => {
      const data = response.listado; // Accedemos a la propiedad listado
      if (Array.isArray(data)) {
          const facturasFiltradas = data.filter((factura) => {
            const fecharecibo = factura.fechafact;
            const cumplefiltrosFecha = this.filtarRangoFechas(fecharecibo, formData.fechaDesde, formData.fechaHasta);
            console.log('cumple filtro de fechas: ', cumplefiltrosFecha);

              return (
                  factura.codFactura.includes(formData.codFactura) &&
                  factura.nombreConsumidor.includes(formData.nombreConsumidor) &&
                  factura.rucConsumidor.includes(formData.rucConsumidor) &&
                  factura.estadoSri.includes(formData.estadoSri) &&
                  this.filtarRangoFechas(fecharecibo, formData.fechaDesde, formData.fechaHasta)

              );
          });

          // Emitir los facturas filtradas al componente padre
          this.facturalaboratorioEmitter.emit(facturasFiltradas);
          console.log('facturas filtradas', facturasFiltradas)
      } else {
          console.error('Los datos no son un array:', data);
      }
  });
} */

async filtrarFacturas() {
  const formData = this.formFacturaLaboratorio.value;
  await this.facturaService.getAll().subscribe({
      next: (response) => {
          const data = response.listado;
          if (Array.isArray(data)) {
              const recibosFiltrados = data.filter((recibo) => {
                  const fecharecibo = recibo.fechafact;

                  //169221463298
                  console.log('Fechas del Recibo: ', fecharecibo);
                  console.log('Fechas del Formulario: ', formData.fechaDesde, formData.fechaHasta);

                  const cumplefiltrosFecha = this.filtarRangoFechas(fecharecibo, formData.fechaDesde, formData.fechaHasta);
                  console.log('cumple filtro de fechas: ', cumplefiltrosFecha);

                  return (
                    recibo.codFactura.includes(formData.codFactura) &&
                    recibo.nombreConsumidor.includes(formData.nombreConsumidor) &&
                    recibo.rucConsumidor.includes(formData.rucConsumidor) &&
                    recibo.estadoSri.includes(formData.estadoSri) &&
                     this.filtarRangoFechas(fecharecibo, formData.fechaDesde, formData.fechaHasta)
                  );
              });
              console.log('Recibos filtrados', recibosFiltrados);
              this.facturalaboratorioEmitter.emit(recibosFiltrados);
          } else {
              console.error(
                  'Los datos no son un array verifca el tipo de dato que es DATA:',
                  data
              );
          }
      },
      error: (error) => {
          this.appService.msgInfoDetail(
              severities.ERROR,
              'ERROR AL CARGAR LOS DATOS',
              error.error
          );
      },
      complete: () => {
          console.log('Obtención de datos completada');
         
      },
  });
}



filtarRangoFechas(fechaRecibo: any, fechaDesde: string, fechaHasta: string): boolean {
  if (!fechaDesde && !fechaHasta) {
      return true;
  }
  const fechaReciboT = fechaRecibo;
  const fechaDesdeT = fechaDesde ? new Date(fechaDesde).getTime() : 0;
  const fechaHastaT = fechaHasta ? new Date(fechaHasta).getTime() + 86400000 : Number.MAX_SAFE_INTEGER;

  return fechaReciboT >= fechaDesdeT && fechaReciboT <= fechaHastaT;
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
