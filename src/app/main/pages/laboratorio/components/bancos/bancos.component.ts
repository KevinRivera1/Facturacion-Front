import { Component, OnInit, Input } from '@angular/core';
import {BancoDto} from "../../model/Bancos.dto";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenDto} from "../../../../../_dto/token-dto";
import {AppService} from "../../../../../_service/app.service";
import { TokenService } from "../../../../../_service/token.service";
import {BreadcrumbService} from "../../../../../_service/utils/app.breadcrumb.service";
import {BancosService} from "../../services/bancos.service";
import { severities } from "../../../../../_enums/constDomain";

@Component({
    selector: 'app-bancos',
    templateUrl: './bancos.component.html',
    styleUrls: ['./bancos.component.scss']
})
export class BancosComponent implements OnInit {

    @Input() bancos: BancoDto;

    proceso: string= 'bancos';

    response: ResponseGenerico

    formBancos: FormGroup

    listBancos: BancoDto[]= [];

    token: TokenDto;

    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,

        private bancosService: BancosService
    ) {
        this.breadcrumbService.setItems([{label: 'BANCOS'}]);
    }

    ngOnInit(): void {
        this.iniciarForms()
        this.llenarListBancos()

    }

    get f() {
        return this.formBancos.controls;
    }

    iniciarForms(){
        this.formBancos= this.formBuilder.group({
            idBancos: new FormControl(null,),
            nombreBancos: new FormControl('', Validators.compose([Validators.required])),
            descBancos: new FormControl('', Validators.compose([Validators.required])),
            estado: new FormControl(true, Validators.compose([Validators.requiredTrue])),
            fechaBancos: new FormControl(new Date().toLocaleDateString(), Validators.compose([Validators.required])),

        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
      //  this.f.idBancos.setValue(this.token.id)
    }


    setSeleccionado(obj) {
        this.bancos = obj;
        this.formBancos = this.formBuilder.group(this.bancos);
        this.f.fechaBancos.setValue(new Date(this.bancos.fechaBancos).toLocaleString())
        console.log("EMITI",this.bancos);
    }


    async llenarListBancos(){
        await this.bancosService.getAll().subscribe({
            next: data => {
                this.listBancos = data.listado
                console.log("CORRECTO");
                console.log(this.listBancos);
            },
            complete: () => {
                this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
            },
            error: error => {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
            }
        })
    }


    guardarbancos(){

        if(this.formBancos.invalid){
            this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
            return
        }else{
           // alert(this.formBancos.value.descBancos);

         //   if(this.formBancos.value.idBancos!=null){
                this.bancos= this.formBancos.value;
                this.bancos.nombreBancos= this.f.nombreBancos.value;
                this.bancos.descBancos= this.f.descBancos.value;
                this.bancos.idUsuarioBancos= 1;


                if(this.bancos.idBancos!= null){
                    this.bancos.fechaBancos= new Date(this.bancos.fechaBancos);
                }else{
                    this.bancos.fechaBancos= new Date();


                }

            if(this.formBancos.value.estado){
                this.bancos.estadoBancos= "ACTIVO";
            }else{
                this.bancos.estadoBancos= "INACTIVO";
            }
          //  }

            this.bancosService.saveObject(this.bancos).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.bancos.idBancos) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.setearForm();
                        this.llenarListBancos();
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
        this.formBancos.reset();
        this.iniciarForms();
        this.bancos=null;
    }


    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
    }

}
