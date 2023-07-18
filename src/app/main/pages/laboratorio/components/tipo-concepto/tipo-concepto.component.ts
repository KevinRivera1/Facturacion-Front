import { Component, Input, OnInit } from '@angular/core';
import { TipoConceptoDto } from '../../model/TipoConcepto.dto';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenDto } from 'src/app/_dto/token-dto';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { TipoConceptoService } from '../../services/tipoConcepto.service';
import { severities } from 'src/app/_enums/constDomain';


@Component({
  selector: 'app-tipo-concepto',
  templateUrl: './tipo-concepto.component.html',
  styleUrls: ['./tipo-concepto.component.css']
})
export class TipoConceptoComponent implements OnInit {


  @Input() tipoConcepto: TipoConceptoDto;

  modal: boolean

  proceso: string= 'tipoConcepto';

  response: ResponseGenerico

  formtipoConcepto: FormGroup

  listTipoConcepto: TipoConceptoDto[]= [];

  token: TokenDto;

  constructor(
      public appService: AppService,
      private formBuilder: FormBuilder,
      private tokenService: TokenService,
      private breadcrumbService: BreadcrumbService,

      private tipoConceptoService: TipoConceptoService,
     
  ) {
      this.breadcrumbService.setItems([{label: 'TIPO CONCEPTO '}]);
  }

  ngOnInit(): void {
      this.iniciarForms()
      this.llenarListTipoConcepto()

  }

  get f() {
      return this.formtipoConcepto.controls;
  }



  iniciarForms(){

    /*
  descTipoConcepto: string;
    fechaTc: Date;
    idTipoConcepto: number;
    idUnidadTc: number;
    idUsuarioTc: number;
    nombreTipoConcepto: string;
    prtidaNc: number;
    estadoTc: string;
    */
      this.formtipoConcepto= this.formBuilder.group({
        idTipoConcepto: new FormControl(null,),
        nombreTipoConcepto: new FormControl('', Validators.compose([Validators.required])),
        descTipoConcepto: new FormControl('', Validators.compose([Validators.required])),
        /*   estadoTc: new FormControl(true, Validators.compose([Validators.requiredTrue])), */
        fechaTc: new FormControl(new Date().toLocaleDateString(), Validators.compose([Validators.required])),
        prtidaNc: new FormControl('', Validators.compose([Validators.required])),
        idUsuarioTc: new FormControl('', Validators.compose([Validators.required])),
        idUnidadTc: new FormControl('', Validators.compose([Validators.required])),
          

      });

      this.token = JSON.parse(this.tokenService.getResponseAuth());
    //  this.f.idFormaPago.setValue(this.token.id)
  }


  setSeleccionado(obj) {
      this.tipoConcepto = obj;
      this.formtipoConcepto = this.formBuilder.group(this.tipoConcepto);
      
      //this.f.fechaTc.setValue(new Date(this.tipoConcepto.fechaTc).toISOString());
      const fechaISO = new Date(this.tipoConcepto.fechaTc).toISOString();
      const fechaSinHora = fechaISO.substr(0, 10);
      this.f.fechaTc.setValue(fechaSinHora);

      console.log("EMITI",this.tipoConcepto);
  }


  async llenarListTipoConcepto(){
      await this.tipoConceptoService.getAll().subscribe({
          next: data => {
              this.listTipoConcepto = data.listado
              console.log("CORRECTO");
              console.log(this.listTipoConcepto);
          },
          complete: () => {
              this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
          },
          error: error => {
              this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
          }
      })
  }


  guardarTipoConcepto(){

      if(this.formtipoConcepto.invalid){
          this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
          return
      }else{
         // alert(this.formFormaPago.value.descripcionFp);

       //   if(this.formFormaPago.value.idFormaPago!=null){

       /*
 idTipoConcepto: new FormControl(null,),
        nombreTipoConcepto
        descTipoConcepto
        estadoTc
        fechaTc
        prtidaNc
        idUsuarioTc
        idUnidadTc
          
       */
              this.tipoConcepto= this.formtipoConcepto.value;
              this.tipoConcepto.idTipoConcepto= this.f.idTipoConcepto.value;
              this.tipoConcepto.nombreTipoConcepto= this.f.nombreTipoConcepto.value;
              this.tipoConcepto.descTipoConcepto= this.f.descTipoConcepto.value;
              this.tipoConcepto.prtidaNc= this.f.prtidaNc.value;
              this.tipoConcepto.idUsuarioTc=  this.f.idUsuarioTc.value;
              this.tipoConcepto.idUnidadTc=  this.f.idUnidadTc.value;


              if(this.tipoConcepto.idTipoConcepto!= null){
                  this.tipoConcepto.fechaTc= new Date(this.tipoConcepto.fechaTc);
              }else{
                  this.tipoConcepto.fechaTc= new Date();


              }

          /*if(this.formtipoConcepto.value.estadoTc){
              this.tipoConcepto.estadoTc= "ACTIVO";
          }else{
              this.tipoConcepto.estadoTc= "INACTIVO";
          }*/
        //  }

          this.tipoConceptoService.saveObject(this.tipoConcepto).subscribe({
              next: (data) => {
                  this.response = data;
                  if (this.response.codigoRespuestaValue == 200) {
                      if (!this.tipoConcepto.idTipoConcepto) {
                          this.appService.msgCreate()
                      } else {
                          this.appService.msgUpdate()
                      }

                      this.setearForm();
                      this.llenarListTipoConcepto();
                  }

              },
              complete: () => {
              },
              error: error => {
              }
          })



      }
      this.modal = false;
  }


  setearForm() {
      this.formtipoConcepto.reset();
      this.iniciarForms();
      this.tipoConcepto=null;
  }


  cancelar() {
      this.setearForm();
      this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
      this.modal = false;
  }
  abrirmodal(){
    this.modal = true;
  }



}
