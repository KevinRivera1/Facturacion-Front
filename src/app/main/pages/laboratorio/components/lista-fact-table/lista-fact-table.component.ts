import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { Table } from 'primeng/table';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { AppService } from 'src/app/_service/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/_service/token.service';
import { TokenDto } from 'src/app/_dto/token-dto';
import { NotaCreditoDto } from '../../model/NotaCreditoDto';
import { NotaCreditoService } from '../../services/nota-credito.service';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { severities } from 'src/app/_enums/constDomain';



@Component({
  selector: 'app-lista-fact-table',
  templateUrl: './lista-fact-table.component.html',
  styleUrls: ['./lista-fact-table.component.css']
})
export class ListaFactTableComponent implements OnInit {
  @Input() notas: NotaCreditoDto;

  formNotas: FormGroup;
  token: TokenDto;
  response: ResponseGenerico;

  @Input() listFactura: FacturaDto[];
  @Output() facturasSelect = new EventEmitter();
  facturas: FacturaDto;
  selectedFacturas: FacturaDto[];
  facturaSelect: FacturaDto;

  //@Input() listDetalle: DetalleFacturaDto[];
  //@Output() detallesSelect = new EventEmitter();
  //detalles: DetalleFacturaDto;
  //selectedDetalles: DetalleFacturaDto[];
  //detalleSelect: DetalleFacturaDto;

  submitted: boolean;
  loading: boolean;
  exportColumns: any[];

  @Input() facturasConDetalles: any[] = [];
  clienteSelect: DetalleFacturaDto;

  cols: any[];

  modal: boolean;

  constructor(
    private facturaService: FacturaService,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private detallefacturaService: DetalleFacturaService,
    private notacreditoService: NotaCreditoService,
    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

  ngOnInit() {
    this.clienteSelect= new DetalleFacturaDto();
    this.iniciarForms();
    //this.detalleSelect = new DetalleFacturaDto();
    //this.llenardetalleFactura();
  }

  async llenardetalleFactura() {
    await this.detallefacturaService.getAll().subscribe({
        next: (data) => {
            this.facturasConDetalles = data.listado;
            console.log('CORRECTO');
            console.log(this.facturasConDetalles);
        },
        complete: () => {
            this.appService.msgInfoDetail(
                severities.INFO,
                'INFO',
                'Datos Cargados exitosamente' ,
                500
            );
        },
        error: (error) => {
            this.appService.msgInfoDetail(
                severities.ERROR,
                'ERROR',
                error.error
            );
        },
    });
  }


  cargarfactura(clienteSelectDto: DetalleFacturaDto){
    this.clienteSelect= clienteSelectDto;
    this.abrirmodal();
    
  }

  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }

  get f() {
    return this.formNotas.controls;
  }

  iniciarForms() {
    this.formNotas = this.formBuilder.group({
      idNotaCredito: new FormControl(null),
      codNc: new FormControl('001-001-00000', [
        Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{5}$/)]),
      idFactura: new FormControl('', Validators.compose([Validators.required])),
      fechaNc: new FormControl(new Date().toLocaleDateString()),
      idEstadoNc: new FormControl(true, Validators.compose([Validators.requiredTrue])),
      motivoNc: new FormControl('', Validators.compose([Validators.required])),
    });

    this.token = JSON.parse(this.tokenService.getResponseAuth());
  }

  loadData(event) {
    this.loading = true;
    setTimeout(() => {
      this.facturaService.getAll().subscribe((res) => {
        this.listFactura = res;
        console.log('LLAMADA');
        console.log(this.listFactura);
        this.loading = false;
      });
    }, 1000);
  }



  guardarNotas() {
    this.notas = this.formNotas.value;
    this.notas.codNc = this.f.codNc.value;
    this.notas.idFactura = this.clienteSelect.idFacturaDTO.idFactura;
    this.notas.idEstadoNc = 1;
    this.notas.motivoNc = this.f.motivoNc.value;
    this.notas.idUsuarioNc = this.token.id;
    if (this.notas.idNotaCredito != null) {
      this.notas.fechaNc = new Date(
        this.notas.fechaNc
      );
    } else {
      this.notas.fechaNc = new Date();
    }

    this.notacreditoService.saveObject(this.notas).subscribe({
      next: (data) => {
        this.response = data;
        if (this.response.codigoRespuestaValue == 200) {
          if (!this.notas.idNotaCredito) {
            this.appService.msgCreate();
          } else {
            this.appService.msgUpdate();
          }

          this.setearForm();
        }
      },
      complete: () => { },
    });

    this.modal = false;

  }

  setearForm() {
    this.formNotas.reset();
    this.iniciarForms();
    this.notas = null;
  }


  cerrar() {
    this.modal = false;
  }


  abrirmodal() {
    this.modal = true;
  }

  filtrarFacturas(facturasConDetalles:any[]){
    this.facturasConDetalles = facturasConDetalles
  }
  


}
