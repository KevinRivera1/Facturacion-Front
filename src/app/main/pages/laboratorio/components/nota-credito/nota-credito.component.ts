import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { NotaCreditoDto } from '../../model/NotaCreditoDto';
import { NotaCreditoService } from '../../services/nota-credito.service';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { severities } from 'src/app/_enums/constDomain';
import { FormUtil } from '../../formUtil/FormUtil';
import { TokenDto } from 'src/app/_dto/token-dto';
import { TokenService } from 'src/app/_service/token.service';

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
  token: TokenDto;
  modal: boolean;
  modal1: boolean;

  listNotas: NotaCreditoDto[] = [];
  listFacturas: FacturaDto[] = [];
  listDetalles: DetalleFacturaDto[] = [];

  constructor(

    private breadcrumbService: BreadcrumbService,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    private tokenService: TokenService

  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

  ngOnInit() {

    this.iniciarForms();
    this.formUtil = new FormUtil(this.buscarFacturas);
  
  }

  get f() {
    return this.buscarFacturas.controls;
}

iniciarForms() {
  this.buscarFacturas = this.formBuilder.group({
      idFactura: [null],
      codFactura: ['', [Validators.pattern(/^\d{3}-\d{3}-\d{5}$/)]],
      nombreConsumidor: ['', Validators.pattern('^[a-zA-ZÀ-ÿ ]*$')],
      rucConsumidor: ['', [Validators.pattern('^[0-9]{1,13}$')]]
  });
  this.token = JSON.parse(this.tokenService.getResponseAuth());
  //this.f.idUsuarioEstComprob.setValue(this.token.id)
}

  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }




  filtrarFacturas() {
    const formData = this.buscarFacturas.value;
    this.facturaService.getAll().subscribe({
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
        const codFacturaMatch = this.matchFilter(factura.codFactura, formData.codFactura);
        const nombreConsumidorMatch = this.matchFilter(factura.nombreConsumidor, formData.nombreConsumidor);
        const rucConsumidorMatch = this.matchFilter(factura.rucConsumidor, formData.rucConsumidor);
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





