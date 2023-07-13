import {Component, Input, OnInit} from '@angular/core';
import {CretencionDto} from "../../model/CretencionDto";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClienteDto} from "../../model/ClienteDto";
import {AppService} from "../../../../../_service/app.service";
import {TokenService} from "../../../../../_service/token.service";
import {BreadcrumbService} from "../../../../../_service/utils/app.breadcrumb.service";
import {ConsultasService} from "../../services/consultas.service";
import {CretencionService} from "../../services/cretencion.service";
import {TokenDto} from "../../../../../_dto/token-dto";
import {severities} from "../../../../../_enums/constDomain";

@Component({
  selector: 'app-cretencion',
  templateUrl: './cretencion.component.html',
  styleUrls: ['./cretencion.component.scss']
})
export class CretencionComponent implements OnInit {


    @Input() cretencion: CretencionDto;

    proceso:string = 'cretencion'

    response: ResponseGenerico

    formCretencion: FormGroup
    formCliente:FormGroup
    listCretencion:CretencionDto[]=[];

    listCliente:ClienteDto[]=[];


    clienteSelect:ClienteDto;

    visible:boolean= false;

    visibleBusqCl:boolean=false;

    token: TokenDto;

    loading: boolean= false;


    tipoCliente:number;


    cedulaBusqueda: string;

    nombreBusqueda: string;

    apellidoBusqueda:string

    nombres:string;




  constructor(

      public appService: AppService,
      private formBuilder: FormBuilder,
      private tokenService: TokenService,
      private breadcrumbService: BreadcrumbService,
      private consultaService: ConsultasService,
      private cretencionService: CretencionService
  ) { this,breadcrumbService.setItems([{label: 'Comprobantes de Retencion Servicios'}])
  }

  ngOnInit(): void {

      this.clienteSelect= new ClienteDto();
  }



  iniciarFormCliente(){
      this.formCliente= this.formBuilder.group({
          cedula: new FormControl('',),
          nombre:new FormControl('',),
          direccion:new FormControl('',),
          telefono:new FormControl('',),
          correo:new FormControl('',),
      });




  }



    iniciarForm(){
        this.formCretencion= this.formBuilder.group({

            idComprobanteRetencion: new FormControl('', null),
            fechaComprobanteRet:new FormControl('', Validators.compose([Validators.required])),
            totalRet:new FormControl('', ),
            idCliente:new FormControl('', Validators.compose([Validators.required])),
            idEstadoRet:new FormControl('', Validators.compose([Validators.required])),
            idCajaRet:new FormControl('', ),
            pathPdfRet:new FormControl('', ),
            pathXmlRet:new FormControl('', ),
            claveAccesoKey:new FormControl('', ),
            numAutorizaRet:new FormControl('', ),
            fechaAutorizaRet:new FormControl('', ),
            ambienteSriRet:new FormControl('', ),
            emisionRet:new FormControl('', ),
            estadoSriRet:new FormControl('', ),
            xmlRet:new FormControl('', ),
            idUsuarioRet:new FormControl('', Validators.compose([Validators.required])),
            fechaComprobanteRetString:new FormControl('', Validators.compose([Validators.required])),
        });


        this.token= JSON.parse(this.tokenService.getResponseAuth());
        this.f.idUsuarioRet.setValue(this.token.id)
        this.f.fechaComprobanteRetString.setValue(new Date())

    }

    get f() {
        return this.formCretencion.controls;
    }


    setSeleccionado(obj) {
        this.cretencion = obj;
        this.formCretencion = this.formBuilder.group(this.cretencion);
        this.visible=true;
    }


    async llenarListCretencion(){
      this.loading= true;
        await this.cretencionService.getAll().subscribe({
                next: data => {
                    this.listCretencion = data.listado
                    this.loading=false;

                },
                complete: () => {
                    this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
                    this.loading=false;
                },
                error: error => {
                    this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
                    this.loading=false;
                }
            }
        );



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
    }







setearForm() {
        this.formCretencion.reset();
        this.iniciarForm();
    }

    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
        this.visible=false;
    }



    registrarNuevo() {
        this.cretencion = new CretencionDto();
        this.iniciarForm();
        this.visible=true;
        this.clienteSelect= new ClienteDto();
        this.tipoCliente= 0;
        this.listCliente= [];
    }


    busquedaCliente(){

      if(this.tipoCliente==0){
          this.visibleBusqCl= false;
      }else{
          this.visibleBusqCl= true;
      }
        this.cedulaBusqueda= null;
        this.nombreBusqueda= null;
        this.apellidoBusqueda= null;
    }

    cargarCliente(clienteSelectDto: ClienteDto ){
      this.clienteSelect= clienteSelectDto;
      this.visibleBusqCl= false;

    }



}



