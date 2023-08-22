import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { NotaCreditoDto } from '../../model/NotaCreditoDto';
import { NotaCreditoService } from '../../services/nota-credito.service';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { FormGroup } from '@angular/forms';
import { severities } from 'src/app/_enums/constDomain';
import { FormUtil } from '../../formUtil/FormUtil';

@Component({
  selector: 'app-nota-credito',
  templateUrl: './nota-credito.component.html',
  styleUrls: ['./nota-credito.component.css']
})
export class NotaCreditoComponent implements OnInit {
  @Output() facturaEmitter = new EventEmitter();
  facturas: FacturaDto[];
  proceso: string = 'conceptos';
  buscarFacturas: FormGroup;
  formUtil: FormUtil;

  modal: boolean;
  modal1: boolean;

  listNotas: NotaCreditoDto[] = [];
  listFacturas: FacturaDto[] = [];
  listDetalles: DetalleFacturaDto[] = [];

  constructor(

    private breadcrumbService: BreadcrumbService,
    public appService: AppService,
    private notasService: NotaCreditoService,
    private facturasService: FacturaService,
    private detallefacturaService: DetalleFacturaService,

  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

  ngOnInit() {
    this.llenarListFacturas();
    this.formUtil = new FormUtil(this.buscarFacturas);
  
  }

  get f() {
    return this.buscarFacturas.controls;
}

  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }


  async llenarListFacturas() {
    await this.facturasService.getAll().subscribe({
      next: (data) => {
        this.listFacturas = data.listado;
        console.log('CORRECTO');
        console.log(this.listFacturas);
      },
    });
  }


  filtrarFacturas() {
    const formData = this.buscarFacturas.value;
    this.detallefacturaService.getAll().subscribe({
        next: (response) => {
            const facturasFiltrados = this.filtrarFacturasPorCriterios(response.listado, formData);
            console.log('Recibos filtrados', facturasFiltrados);
            if (facturasFiltrados.length > 0) {
                this.facturaEmitter.emit(facturasFiltrados);
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

filtrarFacturasPorCriterios(facturas, formData) {
    return facturas.filter((factura) => {
        const fechafactura = factura.idFacturaDTO.fechaFact;
        const codFacturaMatch = this.matchFilter(factura.idFacturaDTO.codFactura, formData.codFactura);
        const nombreConsumidorMatch = this.matchFilter(factura.idFacturaDTO.nombreConsumidor, formData.nombreConsumidor);
        const rucConsumidorMatch = this.matchFilter(factura.idFacturaDTO.rucConsumidor, formData.rucConsumidor);
        return codFacturaMatch && nombreConsumidorMatch && rucConsumidorMatch;
    });
}

matchFilter(value, filter) {
    if (filter === '') {
        return true;
    }
    return value && value.includes(filter);
}


onInputNroFactura(event: any) {
  const input = event.target;
  const value = input.value.replace(/[^0-9]/g, '');

  const groups = [
      value.slice(0, 3),
      value.slice(3, 6),
      value.slice(6, 11),
  ].filter(Boolean);
  const formattedValue = groups.join('-');

  input.value = formattedValue;
  this.f.codFactura.setValue(formattedValue);

  const cursorPosition = input.selectionStart;
  input.setSelectionRange(cursorPosition, cursorPosition);
}

preventNumbers(event: KeyboardEvent) {
  this.formUtil.preventNumbers(event);
}

maxLengthNombre(event: Event) {
  this.formUtil.limitInputLength(event, 30, 'nombreConsumidor');
}

maxiLengthRuc(event: Event) {
  this.formUtil.limitInputLength(event, 13, 'rucConsumidor');
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





