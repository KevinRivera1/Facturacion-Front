import { Component, OnInit, Input } from '@angular/core';
import { ResponseGenerico } from '../../../../../_dto/response-generico';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TokenDto } from '../../../../../_dto/token-dto';
import { AppService } from '../../../../../_service/app.service';
import { TokenService } from '../../../../../_service/token.service';
import { BreadcrumbService } from '../../../../../_service/utils/app.breadcrumb.service';
import { severities } from '../../../../../_enums/constDomain';
import { CentroCostoDto } from '../../model/CentroCosto.dto';
import { CentroCostosService } from '../../services/centro-costos.service';

@Component({
    selector: 'app-centro-costos',
    templateUrl: './centro-costos.component.html',
    styleUrls: ['./centro-costos.component.scss'],
})
export class CentroCostosComponent implements OnInit {

  @Input() centros: CentroCostoDto;           //Recibir datos desde un componente padre

  modal: boolean;                             //Visibilidad de un modal

  visible: boolean = false;                   //Visibilidad de un elemento para búsqueda
  visibleBusqCl: boolean = false;             

  proceso: string = 'CentroCostos';           //Almacena el valor 'CentroCostos'

  response: ResponseGenerico;                 //Almacenar la respuesta generica de una operacion

  formCentroCo: FormGroup;                    //Objeto que representa el formulario del componente

  listCentrosCo: CentroCostoDto[] = [];       //Lista de objetos CentroCostoDto

  token: TokenDto;                            //Almacena el token de autenticacion



  constructor(                                 //Inyectan los servicios y dependencias necesarios
      public appService: AppService,
      private formBuilder: FormBuilder,
      private tokenService: TokenService,
      private breadcrumbService: BreadcrumbService,
      private CentroCostosService: CentroCostosService
  ) {
      this.breadcrumbService.setItems([{ label: 'Centro Costos' }]);//Configura el breadcrumb del componente
  }



  ngOnInit(): void {                //Ciclo de vida OnInit, se ejecuta cuando el componente es inicializado
      this.iniciarForms();          //Inicializan los formularios del componente
      this.llenarListCentro();      //Llena la lista de centros de costo
  }

 
 

  iniciarForms() {                   //Inicializar los formularios del componente
      this.formCentroCo = this.formBuilder.group({
          // Definicion de los campos del formulario con sus respectivas validaciones
          idCentroCosto:     new FormControl(null),
          codCentroCosto:    new FormControl('SC-00000', [ Validators.required,Validators.pattern(/^SC-\d{5}$/)]),
          nombreCentroCosto: new FormControl('', Validators.compose([Validators.required])),
          descCentroCosto:   new FormControl('', Validators.compose([Validators.required])),
          estadoCentroCosto: new FormControl(true, Validators.compose([Validators.requiredTrue])),
          fechaCentroCosto:  new FormControl(new Date().toLocaleDateString(), Validators.compose([Validators.required])),
      });
      this.token = JSON.parse(this.tokenService.getResponseAuth()); // Se obtiene y se parsea el token de autenticacion
  }



  get f() {                           //Getter para acceder a los controles del formulario mas facilmente
      return this.formCentroCo.controls;
  }



  setSeleccionado(obj) {              //Establecer el objeto seleccionado en el formulario
      this.centros = obj;
      this.f.estadoCentroCosto.enable(); 
      this.formCentroCo = this.formBuilder.group(this.centros);
      this.f.estadoCentroCosto.setValue(this.centros.estadoCentroCosto === 'ACTIVO');
      console.log('EMITI', this.centros);
  }



  async llenarListCentro() {  //Asincrono para llenar la lista de centros de costo
      await this.CentroCostosService.getAllC().subscribe({
          next: (data) => {
              this.listCentrosCo = data.listado;
              console.log('CORRECTO');
              console.log(this.listCentrosCo);
          },
          complete: () => {
              this.appService.msgInfoDetail(
                  severities.INFO,
                  'INFO',
                  'Datos Cargados exitosamente',
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

  onCodCentroCostoInput(event: Event) {  //Formatear el campo de codigo de centro de costo mientras se ingresa
      const inputElement = event.target as HTMLInputElement;
      const numericValue = inputElement.value.replace(/\D/g, '');
      inputElement.value = `SC-${numericValue}`;
      this.formCentroCo.controls['codCentroCosto'].setValue(inputElement.value);
  }

  guardarCentro() {                         //Guardar el centro de costo
    if (this.formCentroCo.invalid) {
        let mensajes = [];
        if (this.f.descCentroCosto.invalid || this.f.nombreCentroCosto.invalid) {
          mensajes.push('Faltan Campos por llenar.');
        }
        if (this.f.codCentroCosto.invalid) {
            mensajes.push('El campo Codigo debe contener 5 digitos numericos.');
        }
        if (mensajes.length > 0) {
          this.appService.msgInfoDetail('warn', 'ALERTA', mensajes.join(' '));
          return;
        }
      }
      

      
      //Obtienen los valores del formulario y se asignan al objeto centros
      this.centros = this.formCentroCo.value;
      this.centros.nombreCentroCosto = this.f.nombreCentroCosto.value;
      this.centros.codCentroCosto = this.f.codCentroCosto.value;
      this.centros.descCentroCosto = this.f.descCentroCosto.value;
      this.centros.estadoCentroCosto = this.formCentroCo.value.estadoCentroCosto ? 'ACTIVO' : 'INACTIVO';
      this.centros.idUsuarioCentroCosto = this.token.id;

      //Verifica si es una actualizacion o un nuevo registro y se asigna la fecha correspondiente
      if (this.centros.idCentroCosto) {
          this.centros.fechaCentroCosto = new Date(this.centros.fechaCentroCosto);
      } else {
          this.centros.fechaCentroCosto = new Date();
      }

      //Validacion de duplicados llamando a la funcion existeRegistro
      const nombreCentroCosto = this.f.nombreCentroCosto.value;
      const codCentroCosto = this.f.codCentroCosto.value;
       
            if (this.existeRegistro(nombreCentroCosto, codCentroCosto, this.centros.idCentroCosto)) {
            let mensajes = [];
            if (this.existeRegistroNombre(nombreCentroCosto, this.centros.idCentroCosto)) {
            mensajes.push(`El nombre "${nombreCentroCosto}" ya existe.`);
            }
            if (this.existeRegistroCodigo(codCentroCosto, this.centros.idCentroCosto)) {
            mensajes.push(`El código "${codCentroCosto}" ya existe.`);
            }
            mensajes.forEach(mensaje => {
            this.appService.msgInfoDetail('warn', 'Registro Duplicado', mensaje);
            });
            return;
        }  
        

      //Guarda el objeto centro de costo a traves del servicio CentroCostosService
      this.CentroCostosService.saveObjectC(this.centros).subscribe({
          next: (data) => {
              this.response = data;
              console.log(this.response);
              if (this.response.codigoRespuestaValue == 200) {
                  if (!this.centros.idCentroCosto) {
                      this.appService.msgCreate();
                  } else {
                      this.appService.msgUpdate();
                      console.log(this.response);
                  }
                  this.setearForm();
                  this.llenarListCentro();
              }
          },
          complete: () => {},
          error: (error) => {},
      });

      //Cierra el modal
      this.modal = false;
  }

  
  
  //Verificar si existe un registro con el mismo nombre o codigo
  private existeRegistro(nombreCentroCosto: string, codCentroCosto: string, idCentroCosto: number): boolean {
    return this.listCentrosCo.some(
      (centro) =>
        (centro.nombreCentroCosto === nombreCentroCosto ||
          centro.codCentroCosto === codCentroCosto) &&
        centro.idCentroCosto !== idCentroCosto
    );
  }
  
  private existeRegistroNombre(nombreCentroCosto: string, idCentroCosto: number): boolean {
    return this.listCentrosCo.some(
      (centro) => centro.nombreCentroCosto === nombreCentroCosto && centro.idCentroCosto !== idCentroCosto
    );
  }
  
  private existeRegistroCodigo(codCentroCosto: string, idCentroCosto: number): boolean {
    return this.listCentrosCo.some(
      (centro) => centro.codCentroCosto === codCentroCosto && centro.idCentroCosto !== idCentroCosto
    );
  }



  //Restablecer el formulario
  setearForm() {
      this.formCentroCo.reset();
      this.iniciarForms();
  }

  //Cancelar la accion y restablecer el formulario
  cancelar() {
      this.setearForm();
      this.modal = false;
  }

  //Abrir el modal
  abrirmodal() {
      this.modal = true;
  }

  //Cerrar el modal y restablecer el formulario
  cerrar() {
    this.f.estadoCentroCosto.disable(); 
      this.setearForm();
      
      this.modal = false;
  }
}










































