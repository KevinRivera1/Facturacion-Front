import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ConsultasService } from '../../services/consultas.service';
import { ClienteDto } from '../../model/ClienteDto';
import { AppService } from 'src/app/_service/app.service';
import { severities } from 'src/app/_enums/constDomain';
import { CretencionService } from '../../services/cretencion.service';
import { CretencionDto } from '../../model/CretencionDto';

@Component({
    selector: 'app-recibo-caja',
    templateUrl: './recibo-caja.component.html',
    styleUrls: ['./recibo-caja.component.scss'],
})
export class ReciboCajaComponent implements OnInit {
    displayModal: boolean = false;

    modal: boolean;
    modalBuscar: boolean;
    modalBusTabl: boolean;
    modal4: boolean;
    modal1: boolean; //Visibilidad de un modal
    busquedaForm: FormGroup;

    maxLengthR: number = 13;
    maxLengthC: number = 10;

    constructor(private breadcrumbService: BreadcrumbService,
        public appService: AppService,
        private formBuilder: FormBuilder,
        //Busqueda
        private consultaService: ConsultasService,
        private cretencionService: CretencionService,
        ) {
        {
            this.breadcrumbService.setItems([{ label: 'Recibo Caja ' }]);
        }
    }

    ngOnInit() {}

    cancelar() {
        // this.setearForm();
        this.modal = false;
    }

    onInputR(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        if (value.length > this.maxLengthR) {
            inputElement.value = value.slice(0, this.maxLengthR); // Truncar el valor a la longitud máxima
            this.busquedaForm.controls['Cantidad'].setValue(inputElement.value); // Actualizar el valor del formulario
        }
    }

    onInputC(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;
        if (value.length > this.maxLengthC) {
            inputElement.value = value.slice(0, this.maxLengthC); // Truncar el valor a la longitud máxima
            this.busquedaForm.controls['Cantidad'].setValue(inputElement.value); // Actualizar el valor del formulario
        }
    }

    //Abrir el modal
    abrirmodal() {
        this.modal = true;
    }
    abrirmodal1() {
        this.modal1 = true;
    }


   
    //Cerrar el modal y restablecer el formulario
    cerrar() {
        this.modal = false;
    }
    cerrarmodal1() {
        this.modal1 = false;
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


      loading: boolean= false;
      listCliente:ClienteDto[]=[];
      listCretencion:CretencionDto[]=[];
      tipoCliente:number;
      cedulaBusqueda: string;
      nombreBusqueda: string;
      apellidoBusqueda:string
      nombres:string;
      formCliente:FormGroup

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
      
}
