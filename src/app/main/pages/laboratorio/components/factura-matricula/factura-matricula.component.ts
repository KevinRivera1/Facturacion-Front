import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ListFormaPagoComponent } from '../list-forma-pago/list-forma-pago.component';
import { AppService } from 'src/app/_service/app.service';
import { ConsultasService } from '../../services/consultas.service';
import { CretencionService } from '../../services/cretencion.service';
import { ClienteDto } from '../../model/ClienteDto';
import { CretencionDto } from '../../model/CretencionDto';
import { severities } from 'src/app/_enums/constDomain';
import { FormaPagoDto } from '../../model/FormaPago.dto';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { TokenDto } from 'src/app/_dto/token-dto';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-factura-matricula',
  templateUrl: './factura-matricula.component.html',
  styleUrls: ['./factura-matricula.component.css']
})
export class FacturaMatriculaComponent implements OnInit {
  @Output() facturaMatriculaEmitter = new EventEmitter();
  @Input() listEstado: FacturaDto[];
  matricula: FacturaDto[];
  selectedestado: DetalleFacturaDto[];
  token: TokenDto;
  modal: boolean;
  cedula: string;
  modal2: boolean;
  modal3: boolean;
  modal1: boolean; //Visibilidad de un modal
  busquedaForm: FormGroup;
  formFacturaMatricula: FormGroup;
  modallista: boolean;
  modalBuscar: boolean;
  displayModal: boolean = false;
  modalBusTabl: boolean;
  maxLengthR: number = 13;
  maxLengthC: number = 10;



  constructor(private breadcrumbService: BreadcrumbService,
    public appService: AppService,
    private formBuilder: FormBuilder,
    //Busqueda
    private detalleFacturaService: DetalleFacturaService,
    private facturaService: FacturaService,
    private consultaService: ConsultasService,
    private cretencionService: CretencionService,) {
    {
      this.breadcrumbService.setItems([{ label: 'Factura Matricula ' }]);
    }
  }

  ngOnInit(): void {
    this.iniciarForms();
  }

  filtrarFacturas(){
    const formData = this.formFacturaMatricula.value;
    this.detalleFacturaService.getAll().subscribe({
        next: (response) => {
            const facturasFiltradas = this.filtrarFacturasPorCriterios(response.listado, formData);
            console.log('Facturas filtradas', facturasFiltradas);
            if (facturasFiltradas.length > 0) {
                this.facturaMatriculaEmitter.emit(facturasFiltradas);
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

  iniciarForms() {
    this.formFacturaMatricula = this.formBuilder.group({
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

  cerrarmodal1() {
    this.modal1 = false;
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


  //BUSQUEDA
  selectedOption: string = '';
  data: string = ''


  buscarU(): void {
    switch (this.selectedOption) {
      case "Cliente":
        this.data = "Cliente";
        break;
      case "Empleado EPN":
        this.data = "Empleado";
        break;
      default:
        this.data = ""; // Valor por defecto si ninguna opción está seleccionada
        break;
    }
    this.modalBuscar = true;
    console.log(this.data);
  }


  loading: boolean = false;
  listCliente: ClienteDto[] = [];
  listPago: FormaPagoDto[] = [];
  listCretencion: CretencionDto[] = [];
  tipoCliente: number; 
  tipoPago: number;
  cedulaBusqueda: string;
  nombreBusqueda: string;
  apellidoBusqueda: string;
  nombreFpBusqueda: string;
  nombres: string;
  formCliente: FormGroup

  iniciarFormCliente() {
    this.formCliente = this.formBuilder.group({
      cedula: new FormControl('',),
      nombre: new FormControl('',),
      direccion: new FormControl('',),
      telefono: new FormControl('',),
      correo: new FormControl('',),
    });
  }

  async llenarListCliente() {

    this.nombres = this.nombreBusqueda == null ? (this.apellidoBusqueda == null ? '0' : this.apellidoBusqueda) : this.nombreBusqueda;

    await this.consultaService.getByIdParametro(this.cedulaBusqueda == null ? '0' : this.cedulaBusqueda, this.nombres, this.tipoCliente).subscribe({
      next: data => {
        this.listCliente = data.listado
        this.loading = false;
      },
      complete: () => {
        this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
        this.loading = false;
      },
      error: error => {
        this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
        this.loading = false;
      }
    }
    );
    this.modalBusTabl = true;
  }

  registrarNuevo() {
    // this.cretencion = new CretencionDto();
    // this.iniciarForm();
    this.modal = true
    this.clienteSelect = new ClienteDto();
    this.tipoCliente = 0;
    this.listCliente = [];
    this.pagoSelect = new FormaPagoDto();
    this.tipoPago = 0;
    this.listPago = [];
  }
  clienteSelect: ClienteDto;

  busquedaCliente() {

    if (this.tipoCliente == 0) {
      this.modalBuscar = false;
    } else {
      this.modalBuscar = true;
    }
    this.cedulaBusqueda = null;
    this.nombreBusqueda = null;
    this.apellidoBusqueda = null;
  }

  cargarCliente(clienteSelectDto: ClienteDto) {
    this.clienteSelect = clienteSelectDto;
    this.modalBusTabl = false;
    this.modalBuscar = false;

  }

  pagoSelect: FormaPagoDto;

  busquedaPago() {

    if (this.tipoPago == 0) {
      this.modalBuscar = false;
    } else {
      this.modalBuscar = true;
    }
    this.nombreFpBusqueda = null;

  }

  cargarPago(pagoSelectDto: FormaPagoDto) {
    this.pagoSelect = pagoSelectDto;
    this.modalBusTabl = false;
    this.modalBuscar = false;

  }

  estados: SelectItem[] = [
    { label: 'seleccionar estado', value: '' },
    { label: 'Anulada', value: 'anulada' },
    { label: 'Pagada', value: 'Pagada' },
   
  ];
  





}
