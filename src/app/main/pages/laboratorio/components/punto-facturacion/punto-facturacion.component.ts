import { Component, OnInit, Input } from '@angular/core';
import {PuntoDto} from "../../model/Punto-fac.dto";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenDto} from "../../../../../_dto/token-dto";
import {AppService} from "../../../../../_service/app.service";
import {TokenService } from "../../../../../_service/token.service";
import {BreadcrumbService} from "../../../../../_service/utils/app.breadcrumb.service";
import {PuntoFacService} from "../../services/punto-fact.service";
import {severities } from "../../../../../_enums/constDomain";

@Component({
  selector: 'app-punto-facturacion',
  templateUrl: './punto-facturacion.component.html',
  styleUrls: ['./punto-facturacion.component.css']
})
export class PuntoFacturacionComponent implements OnInit {

  @Input() puntoFac: PuntoDto;

  proceso: string= 'puntoFac';

  response: ResponseGenerico

  formPunto: FormGroup

  listPunto: PuntoDto[]= [];

  token: TokenDto;

  modal: boolean;

  visible:boolean= false;
  


  constructor(
      public appService: AppService,
      private formBuilder: FormBuilder,
      private tokenService: TokenService,
      private breadcrumbService: BreadcrumbService,

      private PuntoService: PuntoFacService
  ) {
      this.breadcrumbService.setItems([{label: 'PUNTO FACTURACION'}]);
  }

  ngOnInit(): void {
      this.iniciarForms()
      this.llenarListPunto()
  }

  get f() {
      return this.formPunto.controls;
  }
  
  iniciarForms(){
      this.formPunto= this.formBuilder.group({
        idPuntoFacturacion: new FormControl(null,),
        secuencialPuntoFact: new FormControl('', Validators.compose([Validators.required])),
        nombrePuntoFact: new FormControl('', Validators.compose([Validators.required])),
        fechaCreacionPuntoFact: new FormControl(new Date().toLocaleDateString(), Validators.compose([Validators.required])),
      
      });

      this.token = JSON.parse(this.tokenService.getResponseAuth());
    //  this.f.idBancos.setValue(this.token.id)
  }


  setSeleccionado(obj) {
      this.puntoFac = obj;
      this.formPunto = this.formBuilder.group(this.puntoFac);
      this.f.fechaCreacionPuntoFact.setValue(new Date(this.puntoFac. fechaCreacionPuntoFact).toLocaleString())
      console.log("EMITI",this.puntoFac);
  }


  async llenarListPunto(){
      await this.PuntoService.getAll().subscribe({
          next: data => {
              this.listPunto = data.listado
              console.log("CORRECTO");
              console.log(this.listPunto);
          },
          complete: () => {
              this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
          },
          error: error => {
              this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
          }
      })
  }


  guardarpunto(){

      if(this.formPunto.invalid){
          this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
          return
      }else{
         // alert(this.formBancos.value.descBancos);

       //   if(this.formBancos.value.idBancos!=null){
              this.puntoFac= this.formPunto.value;
              this.puntoFac.nombrePuntoFact= this.f.nombrePuntoFact.value;
              this.puntoFac. secuencialPuntoFact= this.f.secuencialPuntoFact.value;
              this.puntoFac.fechaCreacionPuntoFact=this.f.fechaCreacionPuntoFact.value;

              if(this.puntoFac. idPuntoFacturacion!= null){
                  this.puntoFac.fechaCreacionPuntoFact= new Date(this.puntoFac.fechaCreacionPuntoFact);
              }else{
                  this.puntoFac.fechaCreacionPuntoFact= new Date();

              }

        //  }

          this.PuntoService.saveObject(this.puntoFac).subscribe({
              next: (data) => {
                  this.response = data;
                  if (this.response.codigoRespuestaValue == 200) {
                      if (!this.puntoFac. idPuntoFacturacion) {
                          this.appService.msgCreate()
                      } else {
                          this.appService.msgUpdate()
                      }

                      this.setearForm();
                      this.llenarListPunto();
                  }

              },
              complete: () => {
              },
              error: error => {
              }
          })

      }
      this.modal= false
  }


  setearForm() {
      this.formPunto.reset();
      this.iniciarForms();
      this.puntoFac=null;
  }


  cancelar() {
      this.setearForm();
      this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
      this.modal = false;
        }
        closeModal() {
            this.modal = false; 
          }

    abrimodal(){
        this.modal = true
    }


}
