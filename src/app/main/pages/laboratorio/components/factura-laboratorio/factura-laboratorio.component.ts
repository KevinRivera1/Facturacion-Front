import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { TokenDto } from 'src/app/_dto/token-dto';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';
import { FacturaDto } from '../../model/Factura.dto';
import { AppService } from 'src/app/_service/app.service';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { FormUtil } from '../../formUtil/FormUtil';



@Component({
  selector: 'app-factura-laboratorio',
  templateUrl: './factura-laboratorio.component.html',
  styleUrls: ['./factura-laboratorio.component.scss']
})
export class FacturaLaboratorioComponent implements OnInit {


  @Output() facturalaboratorioEmitter = new EventEmitter();
  @Input() listEstado: DetalleFacturaDto[];


  response: ResponseGenerico;
  modal: boolean;
  modal2: boolean;
  formFacturaLaboratorio: FormGroup;
  token: TokenDto;
  cedula: string;
  displayModal: boolean;
  formUtil: FormUtil;



  
  constructor(

    private breadcrumbService: BreadcrumbService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    public appService: AppService,
    private detalleFacturaService: DetalleFacturaService,
  ) {
    
    this.breadcrumbService.setItems([{ label: 'Factura Laboratorio' }]);
    
  }

  ngOnInit() {
    this.iniciarForms();
    this.formUtil = new FormUtil(this.formFacturaLaboratorio);
   
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
        Validators.compose([Validators.required])
      ),
      fechaDesde: [''],
      fechaHasta: [''],
    });
} 

/* filtrador */

filtrarFacturas() {
  const formData = this.formFacturaLaboratorio.value;
  this.detalleFacturaService.getAll().subscribe({
      next: (response) => {
          const facturasFiltradas = this.filtrarFacturaPorCriterios(response.listado, formData);
          console.log('Facturas filtradas', facturasFiltradas);
          if (facturasFiltradas.length > 0) {
              this.facturalaboratorioEmitter.emit(facturasFiltradas);
              this.appService.msgInfoDetail(
                  severities.INFO,
                  'INFO',
                  'Datos Cargados exitosamente',
                  550
              );
          } else {
              console.log('no hay datos')
              this.appService.msgInfoDetail(
                  severities.ERROR,
                  'INFO',
                  'No se encontraron registros',
                  700
              );
          }
      },
      error: (error) => {
          console.error('Error al cargar los datos', error);
          this.appService.msgInfoDetail(severities.ERROR, 'ERROR AL CARGAR LOS DATOS', error.error);
      },
      complete: () => {
          console.log('Obtención de datos completada');
      },
  });
}

filtrarFacturaPorCriterios(facturas, formData) {
  return facturas.filter((factura) => {
      const fechafactura = factura.idFacturaDTO.fechaFact;

      const codFacturalab = this.matchFilter(factura.idFacturaDTO.codFactura, formData.codFactura);
      const nombreConsumidorlab = this.matchFilter(factura.idFacturaDTO.nombreConsumidor, formData.nombreConsumidor);
      const rucConsumidorlab= this.matchFilter(factura.idFacturaDTO.rucConsumidor, formData.rucConsumidor);
      const estadoSrilab = this.matchFilter(factura.idFacturaDTO.estadoSri, formData.estadoSri);
      const cumpleFiltrosFecha = this.filtarRangoFechas(fechafactura, formData.fechaDesde, formData.fechaHasta);

      return codFacturalab && nombreConsumidorlab && rucConsumidorlab && cumpleFiltrosFecha && estadoSrilab;
  });
}

filtarRangoFechas(fechaFactura: any, fechaDesde: string, fechaHasta: string): boolean {
  if (!fechaDesde && !fechaHasta) {
      return true;
  }
  const fechaFacturalab = fechaFactura;
  const fechaDesdeT = fechaDesde ? new Date(fechaDesde).getTime() : 0;
  const fechaHastaT = fechaHasta ? new Date(fechaHasta).getTime() + 86400000 : Number.MAX_SAFE_INTEGER;

  return fechaFacturalab >= fechaDesdeT && fechaFacturalab <= fechaHastaT;
}
matchFilter(value, filter) {
  if (filter === '') {
      return true;
  }
  return value && value.includes(filter);
}

/* validacion cedula ruc */

onInput(event: any) {
  const input = event.target;
  const value = input.value;

  // Remover caracteres no numéricos excepto el símbolo "-"
  const numericValue = value.replace(/[^\d-]/g, '');
  input.value = numericValue;
}


cerrarmodalproformasaceptadas() {

    this.modal = false;

}

cerrarmodalfacturar() {

  this.modal2 = false;

}

abrirmodalproformasaceptadas() {
    this.modal = true;
}
modalformapago() {
  this.displayModal = true;
}

closeModal() {
  this.displayModal = false;
  console.log('cerrando modal');
}


estados: SelectItem[] = [
  { label: 'seleccionar estado', value: '' },
  { label: 'Anulada', value: 'anulada' },
  { label: 'Pagada', value: 'Pagada' },
 
];

}
