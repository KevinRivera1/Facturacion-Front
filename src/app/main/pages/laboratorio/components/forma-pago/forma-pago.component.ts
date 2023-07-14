import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenDto } from 'src/app/_dto/token-dto';
import { severities } from 'src/app/_enums/constDomain';
import { FormaPagoDto } from '../../model/FormaPago.dto';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { FormaPago } from '../../model/FormaPago';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormaPagoService } from '../../services/formaPago.service';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.scss']
})
export class FormaPagoComponent implements OnInit {



 @Input() formapago: FormaPagoDto;

    proceso: string= 'formapago';

    response: ResponseGenerico

    formFormaPago: FormGroup

    listFormaPago: FormaPago[]= [];

    token: TokenDto;

    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,

        private formapagoService: FormaPagoService
    ) {
        this.breadcrumbService.setItems([{label: 'Forma Pago '}]);
    }

    ngOnInit(): void {
        this.iniciarForms()
        this.llenarListFormaPago()

    }

    get f() {
        return this.formFormaPago.controls;
    }

    iniciarForms(){
        this.formFormaPago= this.formBuilder.group({
            idFormaPago: new FormControl(null,),
            nombreFp: new FormControl('', Validators.compose([Validators.required])),
            descripcionFp: new FormControl('', Validators.compose([Validators.required])),
            activo: new FormControl(true, Validators.compose([Validators.requiredTrue])),
            fechaFp: new FormControl(new Date().toLocaleDateString(), Validators.compose([Validators.required])),
            codigoSri:  new FormControl('', Validators.compose([Validators.required])),
            codigoSae:  new FormControl('', Validators.compose([Validators.required])),
            

        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
      //  this.f.idFormaPago.setValue(this.token.id)
    }


    setSeleccionado(obj) {
        this.formapago = obj;
        this.formFormaPago = this.formBuilder.group(this.formapago);
        this.f.fechaFp.setValue(new Date(this.formapago.fechaFp).toLocaleString())
        console.log("EMITI",this.formapago);
    }


    async llenarListFormaPago(){
        await this.formapagoService.getAll().subscribe({
            next: data => {
                this.listFormaPago = data.listado
                console.log("CORRECTO");
                console.log(this.listFormaPago);
            },
            complete: () => {
                this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
            },
            error: error => {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
            }
        })
    }


    guardarformapago(){

        if(this.formFormaPago.invalid){
            this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
            return
        }else{
           // alert(this.formFormaPago.value.descripcionFp);

         //   if(this.formFormaPago.value.idFormaPago!=null){
                this.formapago= this.formFormaPago.value;
                this.formapago.nombreFp= this.f.nombreFp.value;
                this.formapago.descripcionFp= this.f.descripcionFp.value;
                this.formapago.codigoSri= this.f.codigoSri.value;
                this.formapago.codigoSae= this.f.codigoSae.value;
                this.formapago.fechaFp= this.f.fechaFp.value;
                //this.formapago.estado= this.f.estado.value;
                this.formapago.idUsuarioFp= 1;


                if(this.formapago.idFormaPago!= null){
                    this.formapago.fechaFp= new Date(this.formapago.fechaFp);
                }else{
                    this.formapago.fechaFp= new Date();


                }

            if(this.formFormaPago.value.activo){
                this.formapago.activo= "ACTIVO";
            }else{
                this.formapago.activo= "INACTIVO";
            }

            
          //  }

            this.formapagoService.saveObject(this.formapago).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.formapago.idFormaPago) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.setearForm();
                        this.llenarListFormaPago();
                    }

                },
                complete: () => {
                },
                error: error => {
                }
            })



        }
    }


    setearForm() {
        this.formFormaPago.reset();
        this.iniciarForms();
        this.formapago=null;
    }


    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
    }



}
