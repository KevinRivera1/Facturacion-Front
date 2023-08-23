import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ClienteDto } from '../../model/ClienteDto';
import { ConceptoDto } from '../../model/ConceptoDto';
import { CretencionDto } from '../../model/CretencionDto';
import { FacturaDto } from '../../model/Factura.dto';
import { ConceptoService } from '../../services/concepto.service';
import { ConsultasService } from '../../services/consultas.service';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { FacturaService } from '../../services/factura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';

@Component({
  selector: 'app-fact-otros-conceptos',
  templateUrl: './fact-otros-conceptos.component.html',
  styleUrls: ['./fact-otros-conceptos.component.css']
})
export class FactOtrosConceptosComponent implements OnInit {

  @Output() facturaotrosconceptosEmitter = new EventEmitter();
  facturaotrosconceptos: FacturaDto[];


  modal: boolean;
  cedula: string;
  modal2: boolean;
  modal3: boolean;
  modal1: boolean; //Visibilidad de un modal
  formotrosconceptos: FormGroup;
  maxLengthR: number = 13;
  maxLengthC: number = 10;
  modallista: boolean;

  displayModal: boolean = false;

  selectedOption: string = '';

  data: string = '';
  editar: boolean;
  

  /*variables para listar conceptos*/
  loading: boolean;
  @Input() listConceptos: ConceptoDto[];
  conceptos: ConceptoDto;
  /*variable para llamar conceptos*/
  selectedRecord: any;
  CodConcepto: string = '';
  nombreConcepto: string = '';
  valorConcepto: number = 0;
  modalBusTabl: boolean;
  modalBuscar: boolean;
  buscarForm: FormGroup;
  idConcepto: number;

 


  constructor(
    private breadcrumbService: BreadcrumbService,
    private conceptosService: ConceptoService,
    private formBuilder: FormBuilder,
    //Busqueda
    private consultaService: ConsultasService,
    public appService: AppService,
    private facturaService: FacturaService,
    private detalleFacturaService: DetalleFacturaService
    
    
  
  ) {
    
    {
      this.buscarForm = this.formBuilder.group({
        codFactura: ['', [Validators.required]], // Agrega las validaciones que necesites
        // Otros campos del formulario
    });
      this.breadcrumbService.setItems([{ label: 'Factura Otros Conceptos ' }]);
      
    }
  }

  ngOnInit(): void {
    this.iniciarFormsFactura(),
    this.llenarListConceptos();
    this.clienteSelect= new ClienteDto();
   
  }
  
  iniciarFormsFactura() {
    this.formotrosconceptos = this.formBuilder.group({
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

   // this.token = JSON.parse(this.tokenService.getResponseAuth());
    //  this.f.idFormaPago.setValue(this.token.id)
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
    this.modal2 = false;
    this.modal3 = false;
    this.modallista = false;
    this.limpiarLista();
    this.cerrarBC()
  }

  cerrar1() {
    this.modal1 = false;
    this.modal2 = false;
    this.modal3 = false;

    this.modallista = false;
  }

  abrirmodal() {
    this.modal = true;
  }
  abrirmodal1() {
    this.modal1 = true;
  }
  // abrirmodal2() {
  //   this.modal2 = true;
  // }
  abrirmodal3() {
    this.modal3 = true;
  }
  //Cerrar el modal y restablecer el formulario

  abrirmodalista() {
    this.modallista = true;
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

buscarU(): void {
  switch (this.selectedOption) {
    case "Estudiante":
      this.data = "Estudiante";
      break;
    case "0":
      this.data = "Cliente";
      break;
    case "1":
      this.data = "Empleado";
      break;
    default:
      this.data = ""; // Valor por defecto si ninguna opción está seleccionada
      break;
  }
  this.modal2 = true;
  console.log(this.data);
}

clear(table: Table) {
  table.clear();
}

loadData(event) {
  this.loading = true;
  setTimeout(() => {
      this.conceptosService.getAll().subscribe((res) => {
          this.listConceptos = res;
          console.log('LLAMADA');
          console.log(this.listConceptos);
          this.loading = false;
      });
  }, 1000);
}

async llenarListConceptos() {
  await this.conceptosService.getAll().subscribe({
      next: (data) => {
          this.listConceptos = data.listado;
          console.log('CORRECTO');
          console.log(this.listConceptos);
      },
  });
}



showAttributes(record: any) {
  this.selectedRecord = record;

  // Actualiza las variables con los valores del registro seleccionado
  this.idConcepto = this.selectedRecord.idConcepto;
  this.CodConcepto = this.selectedRecord.codigoConcepto;
  this.nombreConcepto = this.selectedRecord.nombreConcepto;
  this.valorConcepto = this.selectedRecord.valorConcepto;
}


estadoOptions: any[] = [
  { label: 'Pagada', value: 'pagada' },
  { label: 'Anulada', value: 'anulada' }
];

estadoSeleccionado: string;


//FIltrar

/* filtrarFacturas() {
  const formData = this.formotrosconceptos.value;
  // Llamada al servicio para filtrar los datos
  this.facturaService.getAll().subscribe((response) => {
      const data = response.listado; // Accedemos a la propiedad listado
      if (Array.isArray(data)) {
          const facturasFiltradas = data.filter((factura) => {
              return (
                  factura.codFactura.includes(formData.codFactura) &&
                  factura.nombreConsumidor.includes(formData.nombreConsumidor) &&
                  factura.rucConsumidor.includes(formData.rucConsumidor) 
              );
          });

          // Emitir los facturas filtradas al componente padre
          this.facturaotrosconceptosEmitter.emit(facturasFiltradas);
          console.log('facturas filtradas', facturasFiltradas)
      } else {
          console.error('Los datos no son un array:', data);
      }
  });
}
 */


filtrarFacturas() {
  const formData = this.formotrosconceptos.value;
  this.facturaService.getAll().subscribe({
      next: (response) => {
          const facturasFiltradas = this.filtrarFacturaPorCriterios(response.listado, formData);
          console.log('Facturas filtradas', facturasFiltradas);
          if (facturasFiltradas.length > 0) {
              this.facturaotrosconceptosEmitter.emit(facturasFiltradas);
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
      const fechafactura = factura.fechaFact;

      const codFacturalab = this.matchFilter(factura.codFactura, formData.codFactura);
      const nombreConsumidorlab = this.matchFilter(factura.nombreConsumidor, formData.nombreConsumidor);
      const rucConsumidorlab= this.matchFilter(factura.rucConsumidor, formData.rucConsumidor);
      const estadoSrilab = this.matchFilter(factura.estadoSri, formData.estadoSri);
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



estados: SelectItem[] = [
  { label: 'seleccionar estado', value: '' },
  { label: 'Anulada', value: 'anulada' },
  { label: 'Pagada', value: 'Pagada' },
 
];


/*mostrar clientes por busqueda*/
loading1: boolean= false;
listCliente:ClienteDto[]=[];
listCretencion:CretencionDto[]=[];
tipoCliente:number;
cedulaBusqueda: string;
nombreBusqueda: string;
apellidoBusqueda:string
nombres:string;
formCliente:FormGroup
buscarCliente: boolean;//MODAL PARA BUSCAR POR CLIENTE
BusTablCliente: boolean;

iniciarFormCliente(){
  this.formCliente= this.formBuilder.group({
      cedula: new FormControl('',),
      nombre:new FormControl('',),
      direccion:new FormControl('',),
      telefono:new FormControl('',),
      correo:new FormControl('',),
  });
}

async llenarListCliente() {

  this.nombres = this.nombreBusqueda == null ? (this.apellidoBusqueda == null ? '0' : this.apellidoBusqueda) : this.nombreBusqueda;

  await this.consultaService.getByIdParametro(this.cedulaBusqueda == null ? '0' : this.cedulaBusqueda, this.nombres, this.tipoCliente).subscribe({
          next: data => {
              this.listCliente = data.listado
              this.loading1 = false;
          },
          complete: () => {
              this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
              this.loading1 = false;
          },
          error: error => {
              this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
              this.loading1 = false;
          }
      }
  );
  this.modalBusTabl=true;
}

registrarNuevo() {
// this.cretencion = new CretencionDto();
// this.iniciarForm();
this.modal=true
this.clienteSelect= new ClienteDto();
this.tipoCliente= 0;
this.listCliente= [];
}
clienteSelect:ClienteDto;

 
cerrarBC(){
  this.buscarCliente=false;
}


busquedaCliente(){

  if(this.tipoCliente==0){
      this.modalBuscar= false;
  }else{
      this.modalBuscar= true;
  }
    this.cedulaBusqueda= null;
    this.nombreBusqueda= null;
    this.apellidoBusqueda= null;
}

cargarCliente(clienteSelectDto: ClienteDto ){
  this.clienteSelect= clienteSelectDto;
  this.modalBusTabl= false;
  this.modalBuscar=false;

}

 // LISTAR CONCEPTOS

 
 cantidadTemporal: number = 1;
 // LISTAR CONCEPTOS
conceptosList: {
  idConcepto: number;
  codConcepto: string;
  nombre: string;
  valor: number;
  cantidad: number;
  total: number;
}[] = [];

addToConceptosList() {
  if (
    this.cantidadTemporal !== 0 &&
    this.cantidadTemporal !== null &&
    this.nombreConcepto.trim() !== '' &&
    this.valorConcepto !== 0
  ) {
    const totalConcepto = this.Total(this.valorConcepto, this.cantidadTemporal);

    const nuevoConcepto = {
      idConcepto: this.idConcepto,
      codConcepto: this.CodConcepto,
      nombre: this.nombreConcepto,
      valor: this.valorConcepto,
      cantidad: this.cantidadTemporal,
      total: totalConcepto,
    };

    this.conceptosList.push(nuevoConcepto);
    this.resetFormValues();
    this.calcularTotalesTotales();
  }
}

resetFormValues() {
  this.CodConcepto = '';
  this.nombreConcepto = '';
  this.valorConcepto = 0;
  this.cantidadTemporal = 1;
  this.modal1 = false;
}

Total(valor: number, cantidad: number): number {
  return cantidad !== 0 ? valor * cantidad : valor;
}


 // ELIMINAR CONCEPTOS
 limpiarLista() {
     this.conceptosList = [];
     this.subtotalTotal = 0;
     this.ivaTotal = 0;
     this.totalTotal = 0;
 }

 eliminarConcepto(concepto: any) {
     const index = this.conceptosList.indexOf(concepto);
     if (index !== -1) {
         this.conceptosList.splice(index, 1);
     }
     this.calcularTotalesTotales(); // Recalcula los totales generales
 }


 // TOTAL IVA SUBTOTAL


 subtotalTotal: number = 0;
 ivaTotal: number = 0;
 totalTotal: number = 0;


 calcularTotalesTotales() {
     this.subtotalTotal = this.conceptosList.reduce((sum, concepto) => sum + this.Total(concepto.valor, concepto.cantidad), 0);
     this.ivaTotal = this.subtotalTotal * 0.12; // Calcula el 12% del subtotal total como IVA total
     this.totalTotal = this.subtotalTotal + this.ivaTotal;
 }



 // EDITAR CONCEPTOS

 conceptoEditando: any = null;
 cantidadEditando: number = 0;

 iniciarEdicionCantidad(concepto: any) {
     this.editar = true;
     this.conceptoEditando = concepto;
     this.cantidadEditando = concepto.cantidad;
 }

 guardarEdicionCantidad() {
     if (this.conceptoEditando) {
         this.conceptoEditando.cantidad = this.cantidadEditando;
         this.calcularTotalesTotales(); // Recalcula los totales generales
         this.conceptoEditando = null; // Limpia la edición
         this.cantidadEditando = 0;
         this.editar = false;
     }
 }

 editarmodal() {
     this.editar = false;
 }


 


//GUARDAR 

tipoFact: string = "FSP";
guardarDatos(): Observable<any> {
  if (
    this.subtotalTotal === 0 ||
    this.ivaTotal === 0 ||
    this.totalTotal === 0
  ) {
    console.log('Algunos campos no se han llenado correctamente.');
    this.appService.msgInfoDetail(
      severities.ERROR,
      'ERROR',
      'verifica los datos antes de generar una nueva Factura'
    );
    return of(null); // Retorna un observable que emite null en caso de error
  }
  const facturaAGuardar = {
    codFactura: this.buscarForm.get('codFactura').value,
    correoConsumidor: this.clienteSelect.correo,
    direccionConsumidor: this.clienteSelect.direccion,
    fechaFact: new Date().toISOString(),
    ivaFact: this.ivaTotal,
    nombreConsumidor: this.clienteSelect.nombre,
    rucConsumidor: this.clienteSelect.cedula,
    subtotalFact: this.subtotalTotal,
    telfConsumidor: this.clienteSelect.telefono,
    totalFact: this.totalTotal,
    estadoSri: this.estadoSeleccionado,
    tipoFactura: this.tipoFact,
  };

  // Llama al método del servicio para guardar la factura y devuelve el observable resultante
  return this.facturaService.saveObject(facturaAGuardar);
  
}

detalleNuevo(): Observable<any> {
  const observables = [];

  for (const concepto of this.conceptosList) {
    const detalleFactura = new DetalleFacturaDto();
    detalleFactura.costoDf = concepto.valor;
   
    detalleFactura.idConcepto = { idConcepto: concepto.idConcepto };
    detalleFactura.idFacturaDTO = { idFactura: concepto.cantidad };
    detalleFactura.unidadesDf = concepto.cantidad;

    observables.push(this.detalleFacturaService.saveObject(detalleFactura));
  }

  // Devuelve un Observable que emite los resultados de las peticiones individuales
  return forkJoin(observables);
}


guardarDatosYDetalles() {
  
  // Llama a guardarDatos() para guardar la factura principal
  this.guardarDatos().subscribe(
    (facturaRespuesta) => {
      console.log('Factura principal guardada:', facturaRespuesta);
      this.appService.msgCreate();
      this.limpiarLista();
      this.modal = false;
      
      // Llama a detalleNuevo() para guardar los detalles de la factura
      this.detalleNuevo().subscribe(
        (detalleRespuestas) => {
          console.log('Detalles de factura guardados exitosamente:', detalleRespuestas);
        },
        (detalleErrores) => {
          console.error('Error al guardar los detalles de factura:', detalleErrores);
        }
      );
    },
    (facturaError) => {
      console.error('Error al guardar la factura principal:', facturaError);
    }
  );
  this.limpiarLista();
 
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

get f() {
  return this.buscarForm.controls;
}


  
}
