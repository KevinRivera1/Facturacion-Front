import { Component, Input, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { ConfirmationService, MessageService } from 'primeng/api';
import { TokenDto } from 'src/app/_dto/token-dto';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ClienteDto } from '../../model/ClienteDto';
import { ConceptoDto } from '../../model/ConceptoDto';
import { CretencionDto } from '../../model/CretencionDto';
import { ConceptoService } from '../../services/concepto.service';
import { ConsultasService } from '../../services/consultas.service';
import { ReciboCajaService } from '../../services/reciboCaja.service';


@Component({
    selector: 'app-recibo-caja',
    templateUrl: './recibo-caja.component.html',
    styleUrls: ['./recibo-caja.component.scss'],
})
export class ReciboCajaComponent implements OnInit {

    reciboC: boolean;//MODAL DE RECIBO CAJA

    cancelarRC() {
        this.reciboC = false;
    }
    abrirRC() {
        this.reciboC = true;
    }

    cerrarRecibo() {
        this.reciboC = false;
        this.limpiarLista();
    }
 
    token: TokenDto;                            //Almacena el token de autenticacion


    //NUMERO DE RECIBO CAJA
    buscarForm: FormGroup;

    constructor(
        private breadcrumbService: BreadcrumbService,
        public appService: AppService,
        private formBuilder: FormBuilder,
        private reciboCaja: ReciboCajaService,
        private confirmationService: ConfirmationService,       
        private messageService: MessageService,
        private tokenService: TokenService,
        //Busqueda
        private consultaService: ConsultasService,
        //Conceptos
        private conceptosService: ConceptoService
    ) {
        {
            this.buscarForm = this.formBuilder.group({
                codRcaja: ['', [Validators.required]], 
            });
            this.breadcrumbService.setItems([{ label: 'Recibo Caja ' }]);
            this.token = JSON.parse(this.tokenService.getResponseAuth()); // Se obtiene y se parsea el token de autenticacion
        }
    }


    ngOnInit() {
        this.llenarListConceptos();
        this.clienteSelect = new ClienteDto();
    }

    get f() {
        return this.buscarForm.controls;
    }
 
    


    //BUSQUEDA CLIENTE

    selectedOption: string = '';
    data: string = '';
    loading: boolean = false;
    listCliente: ClienteDto[] = [];
    listCretencion: CretencionDto[] = [];
    tipoCliente: number;
    cedulaBusqueda: string;
    nombreBusqueda: string;
    apellidoBusqueda: string;
    nombres: string;
    formCliente: FormGroup;

    iniciarFormCliente() {
        this.formCliente = this.formBuilder.group({
            cedula: new FormControl(''),
            nombre: new FormControl(''),
            direccion: new FormControl(''),
            telefono: new FormControl(''),
            correo: new FormControl(''),
        });
    }

    async llenarListCliente() {
        if (!this.nombreBusqueda && !this.apellidoBusqueda && !this.cedulaBusqueda) {
            console.log('Debes ingresar al menos un valor para buscar.');
            this.appService.msgInfoDetail(severities.WARNING, 'ADVERTENCIA', 'Ingresa al menos un valor para buscar.');
            return;
        }

        this.nombres =
            this.nombreBusqueda == null
                ? this.apellidoBusqueda == null
                    ? '0'
                    : this.apellidoBusqueda
                : this.nombreBusqueda;

        await this.consultaService
            .getByIdParametro(
                this.cedulaBusqueda == null ? '0' : this.cedulaBusqueda,
                this.nombres,
                this.tipoCliente
            )
            .subscribe({
                next: (data) => {
                    this.listCliente = data.listado;
                    this.loading = false;
                },
                complete: () => {
                    this.appService.msgInfoDetail(
                        severities.INFO,
                        'INFO',
                        'Datos Cargados exitosamente'
                    );
                    this.loading = false;
                },
                error: (error) => {
                    this.appService.msgInfoDetail(
                        severities.ERROR,
                        'ERROR',
                        error.error
                    );
                    this.loading = false;
                },
            });
        this.BusTablCliente = true;
    }

    registrarNuevo() {
        // this.cretencion = new CretencionDto();
        // this.iniciarForm();
        this.reciboC = true;
        this.clienteSelect = new ClienteDto();
        this.tipoCliente = 1;
        this.listCliente = [];
    }

    clienteSelect: ClienteDto;
    buscarCliente: boolean;//MODAL PARA BUSCAR POR CLIENTE
    BusTablCliente: boolean;//MODAL PARA BUSCAR POR CLIENTE EN TABLA

    cerrarBC(){
        this.buscarCliente=false;
    }

    busquedaCliente() {
        if (this.tipoCliente == 0) {
            this.buscarCliente = false;
        } else {
            this.buscarCliente = true;
        }
        this.cedulaBusqueda = null;
        this.nombreBusqueda = null;
        this.apellidoBusqueda = null;
    }

    cargarCliente(clienteSelectDto: ClienteDto) {
        this.clienteSelect = clienteSelectDto;
        this.BusTablCliente = false;
        this.buscarCliente = false;
    }

    onInputNroRecibo(event: any) {
        const input = event.target;
        const value = input.value.replace(/[^0-9]/g, '');

        const groups = [
            value.slice(0, 3),
            value.slice(3, 6),
            value.slice(6, 11),
        ].filter(Boolean);
        const formattedValue = groups.join('-');

        input.value = formattedValue;
        this.f.codRcaja.setValue(formattedValue);

        const cursorPosition = input.selectionStart;
        input.setSelectionRange(cursorPosition, cursorPosition);
    }

    // CONCEPTOS
    @Input() listConceptos: ConceptoDto[];
    conceptos: ConceptoDto;
    selectedRecord: any;
    idConcepto: string = '';
    nombreConcepto: string = '';
    valorConcepto: number = 0;

    agregarConcepto: boolean;//MODAL DE AGREGAR CONCEPTOS
    cerrarAC() {
        this.agregarConcepto = false;
    }
    abrirAC() {
        this.agregarConcepto = true;
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
        this.idConcepto = this.selectedRecord.codigoConcepto;
        this.nombreConcepto = this.selectedRecord.nombreConcepto;
        this.valorConcepto = this.selectedRecord.valorConcepto;
    }




    // LISTAR CONCEPTOS
    conceptosList: { nombre: string; valor: number; cantidad: number }[] = [];
    cantidadTemporal: number = 1;

    addToConceptosList() {
        if (
            this.cantidadTemporal !== 0 &&
            this.cantidadTemporal !== null &&
            this.nombreConcepto.trim() !== '' &&
            this.valorConcepto !== 0
        ) {
            const totalConcepto = this.Total(
                this.valorConcepto,
                this.cantidadTemporal
            );

            const nuevoConcepto = {
                nombre: this.nombreConcepto,
                valor: this.valorConcepto,
                cantidad: this.cantidadTemporal,
                total: totalConcepto,
            };

            this.conceptosList.push(nuevoConcepto);

            // Limpiar las variables para futuras entradas
            this.nombreConcepto = '';
            this.valorConcepto = 0;
            this.cantidadTemporal = 1;
            this.agregarConcepto = false;

            this.calcularTotalesTotales(); // Llama al método para recalcular los totales generales
        }
    }

    Total(valor: number, cantidad: number): number {
        if (cantidad !== 0) {
            return valor * cantidad;
        } else {
            return valor;
        }
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
        this.subtotalTotal = this.conceptosList.reduce(
            (sum, concepto) =>
                sum + this.Total(concepto.valor, concepto.cantidad),
            0
        );
        this.ivaTotal = this.subtotalTotal * 0.12; // Calcula el 12% del subtotal total como IVA total
        this.totalTotal = this.subtotalTotal + this.ivaTotal;
    }

    // EDITAR CONCEPTOS
    conceptoEditando: any = null;
    cantidadEditando: number = 0;

    editarConcepto: boolean;// MODAL DE EDITAR LA TABLA DE CONCEPTOS

    editarC() {
        this.editarConcepto = false;
    }


    iniciarEdicionCantidad(concepto: any) {
        this.editarConcepto = true;
        this.conceptoEditando = concepto;
        this.cantidadEditando = concepto.cantidad;
    }

    guardarEdicionCantidad() {
        if (this.conceptoEditando) {
            this.conceptoEditando.cantidad = this.cantidadEditando;
            
            // Recalcula el total del concepto editado con la nueva cantidad
            this.conceptoEditando.total = this.Total(
                this.conceptoEditando.valor,
                this.cantidadEditando
            );
            
            this.calcularTotalesTotales(); // Recalcula los totales generales
            this.conceptoEditando = null; // Limpia la edición
            this.cantidadEditando = 0;
            this.editarConcepto = false;
        }
    }

    // GUARDAR

    guardarDatos() {
        const codRcajaValue = this.buscarForm.get('codRcaja').value;

        if (
            this.subtotalTotal === 0 ||
            this.ivaTotal === 0 ||
            this.totalTotal === 0 ||
            codRcajaValue.length !== 13 || // Verifica la longitud del campo codRcaja
            !this.clienteSelect.cedula
        )  {
            if (this.subtotalTotal === 0 || this.ivaTotal === 0 || this.totalTotal === 0) {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Agrega un Concepto');
            }
            if (codRcajaValue.length !== 13) {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'El Recibo Caja debe tener 11 digitos.');
            }
        
            if (!this.clienteSelect.cedula) {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', 'Selecciona un Cliente o Empleado.');
            }
            return;
        }
        const idTipoConsumidorRc = this.tipoCliente === 1 ? 1 : 2; // Asigna 1 si es Empleado EPN, 2 si es Cliente
        const datosAGuardar = {
    
            carreraConsumidorRc: 'Null',
            fechaRcaja: new Date().toISOString(),

            codRcaja: codRcajaValue,
            idTipoConsumidorRc: idTipoConsumidorRc,

            correoConsumidorRc: this.clienteSelect.correo,
            direccionConsumidorRc: this.clienteSelect.direccion,
            nombreConsumidorRc: this.clienteSelect.nombre,
            rucConsumidorRc: this.clienteSelect.cedula,
            telfConsumidorRc: this.clienteSelect.telefono,
            ivaRc: this.ivaTotal,
            subtotalRc: this.subtotalTotal,
            totalRc: this.totalTotal,

            idEstadoRc: 1,
            idUsuarioRc: this.token.id,

            idCajaRc: 0,
            nroPagosRc: 1,
            observacionRc: '',
        };

        // Llama al método del servicio para guardar los datos
        this.reciboCaja.saveObject(datosAGuardar).subscribe(
            (respuesta) => {
                console.log('Datos guardados exitosamente:', respuesta);
                this.appService.msgInfoDetail(severities.INFO, 'Guardado', 'Con Exito.');
                this.buscarForm.get('codRcaja').setValue('');
                this.limpiarLista();
            },
            (error) => {
                console.error('Error al guardar los datos:', error);
                // Puedes mostrar un mensaje de error u otras acciones de manejo de errores aquí
            }
        );
        
        this.reciboC = false;

    }

}
