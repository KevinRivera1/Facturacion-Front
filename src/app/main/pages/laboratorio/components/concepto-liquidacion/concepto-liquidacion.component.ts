import {Component, Input, OnInit} from '@angular/core';
import {ConceptoLiquidacionDto} from "../../model/ConceptoLiquidacionDto";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenDto} from "../../../../../_dto/token-dto";
import {AppService} from "../../../../../_service/app.service";
import {TokenService} from "../../../../../_service/token.service";
import {BreadcrumbService} from "../../../../../_service/utils/app.breadcrumb.service";
import {ConceptoLiquidacionServiceService} from "../../services/conceptoLiquidacion.service";
import {severities} from "../../../../../_enums/constDomain";


@Component({
  selector: 'app-concepto-liquidacion',
  templateUrl: './concepto-liquidacion.component.html',
  styleUrls: ['./concepto-liquidacion.component.scss']
})
export class ConceptoLiquidacionComponent implements OnInit {


    @Input() conceptoLiq: ConceptoLiquidacionDto;

    proceso: string= 'conceptoLiquidacion';

    response: ResponseGenerico

    formConceptoLiq: FormGroup


    listConceptoLiq: ConceptoLiquidacionDto[]=[];

    token: TokenDto;

  constructor(
      public appService: AppService,
      private formBuilder: FormBuilder,
      private tokenService: TokenService,
      private breadcrumbService: BreadcrumbService,
      private conceptoLiqService: ConceptoLiquidacionServiceService



  ) {

      this.breadcrumbService.setItems([{label: 'CONCEPTO LIQUIDACION'}]);
  }

  ngOnInit(): void {
      this.iniciarForms()
      this.llenarListConcepto()
  }


    iniciarForms(){
        this.formConceptoLiq= this.formBuilder.group({
            idConceptoLiquidacion: new FormControl(null,),
            idIva: new FormControl('', Validators.compose([Validators.required])),
            nombreConceptoLiq: new FormControl('', Validators.compose([Validators.required])),
            precio: new FormControl('', Validators.compose([Validators.required])),
            descripcionConceptoLiq: new FormControl('', Validators.compose([Validators.required])),
            estado: new FormControl(true, Validators.compose([Validators.requiredTrue])),
            fechaConceptoLiq: new FormControl(new Date().toLocaleDateString(), Validators.compose([Validators.required])),

        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
        //  this.f.idBancos.setValue(this.token.id)
    }


    get f() {
        return this.formConceptoLiq.controls;
    }


    setSeleccionado(obj) {
        this.conceptoLiq = obj;
        this.formConceptoLiq = this.formBuilder.group(this.conceptoLiq);
        this.f.fechaConceptoLiq.setValue(new Date(this.conceptoLiq.fechaConceptoLiq).toLocaleString())

    }


    async llenarListConcepto(){
        await this.conceptoLiqService.getAll().subscribe({
            next: data => {
                this.listConceptoLiq = data.listado
                console.log("CORRECTO");
                console.log(this.listConceptoLiq);
            },
            complete: () => {
                this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
            },
            error: error => {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error)
            }
        })
    }




    guardarConcepto(){

        if(this.formConceptoLiq.invalid){
            this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
            return
        }else{

            this.conceptoLiq= this.formConceptoLiq.value;
            this.conceptoLiq.nombreConceptoLiq= this.f.nombreConceptoLiq.value;
            this.conceptoLiq.descripcionConceptoLiq= this.f.descripcionConceptoLiq.value;
            this.conceptoLiq.precio= this.f.precio.value;
            this.conceptoLiq.idIva= this.f.idIva.value;
            this.conceptoLiq.idUsuarioConceptoLiq= 1;


            if(this.conceptoLiq.idConceptoLiquidacion!= null){
                this.conceptoLiq.fechaConceptoLiq= new Date(this.conceptoLiq.fechaConceptoLiq);
            }else{
                this.conceptoLiq.fechaConceptoLiq= new Date();


            }

            if(this.formConceptoLiq.value.estado){
                this.conceptoLiq.estadoConceptoLiq= "ACTIVO";
            }else{
                this.conceptoLiq.estadoConceptoLiq= "INACTIVO";
            }
            //  }

            this.conceptoLiqService.saveObject(this.conceptoLiq).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.conceptoLiq.idConceptoLiquidacion) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.setearForm();
                        this.llenarListConcepto();
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
        this.formConceptoLiq.reset();
        this.iniciarForms();
        this.conceptoLiq=null;
    }



    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
    }


}
