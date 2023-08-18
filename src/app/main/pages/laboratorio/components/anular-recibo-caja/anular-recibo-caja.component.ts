import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ReciboCajaDto } from '../../model/reciboCajaDto';
import { ReciboCajaService } from '../../services/reciboCaja.service';

@Component({
    selector: 'app-anular-recibo-caja',
    templateUrl: './anular-recibo-caja.component.html',
    styleUrls: ['./anular-recibo-caja.component.scss'],
})
export class AnularReciboCajaComponent implements OnInit {
    formAnulaRecib: FormGroup;
    token: TokenDto;
    
    @Input() recibos: ReciboCajaDto;
    @Input() estadorecibos: ReciboCajaDto;

    @Input() display: boolean = false;
    @Output() closeModal = new EventEmitter();
    //? Aqui se define la lista de estados del modal de anular
    estados: any[] = [{ name: 'Anulada', value: 'Anulada' }];
    response: ResponseGenerico
    constructor(
        private reciboCajaService: ReciboCajaService,
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([{ label: 'Anulacion Recibo' }]);
    }

    ngOnInit(): void {
        this.iniciarForms();
    }

    get f() {
        return this.formAnulaRecib.controls;
    }

    iniciarForms() {
        this.formAnulaRecib = this.formBuilder.group({
            idReciboCaja: [null],
            codRcaja: [{ value: '', disabled: true }],
            fechaRcaja: [{ value: '', disabled: true }],
            nombreConsumidorRc: [{ value: '', disabled: true },],
            idEstadoRc: ['', Validators.required],
            observacionRc: ['', Validators.required],
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
        this.deshabilitarCampos();
    }

    setSeleccionado(obj) {
        this.estadorecibos = obj;
        this.formAnulaRecib = this.formBuilder.group(this.estadorecibos);
        this.f.idEstadoRc.setValue(this.estadorecibos.idEstadoRc === 0);
        console.log('EMITI', this.estadorecibos);
    }

    //* Funcion para dehabilitar campos del form
    deshabilitarCampos() {
        const camposDeshabilitar = ['codRcaja', 'fechaRcaja', 'nombreConsumidorRc'];
        camposDeshabilitar.some((campos) => {
            this.formAnulaRecib.get(campos).disable();
        });
    }

     //* Función para guardar el motivo de anulacion desde la tabla
     guardarMotivoAnulacion() { 
        if(this.formAnulaRecib.invalid){
            this.appService.msgInfoDetail('warn', 'Verificación', 'Verificar los Datos a Ingresar')
            return
        }else{
           // alert(this.formAnulaRecib.value.descBancos);

         //   if(this.formAnulaRecib.value.idBancos!=null){
                this.recibos= this.formAnulaRecib.value;
                this.recibos.codRcaja= this.f.codRcaja.value;
                this.recibos.fechaRcaja= this.f.fechaRcaja.value;
                this.recibos.nombreConsumidorRc= this.f.nombreConsumidorRc.value;
                this.recibos.idEstadoRc= this.f.idEstadoRc.value;
                this.recibos.observacionRc= this.f.observacionRc.value;
               


/*                 if(this.recibos.idBancos!= null){
                    this.recibos.fechaBancos= new Date(this.bancos.fechaBancos);
                }else{
                    this.bancos.fechaBancos= new Date();


                } */

            if(this.formAnulaRecib.value.estado){
                this.recibos.idEstadoRc= 1; //*Activo = 1
            }else{
                this.recibos.idEstadoRc= 0; //*Inactivo = 0
            }
          //  }

            this.reciboCajaService.saveObject(this.recibos).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.recibos.idReciboCaja) {
                            this.appService.msgCreate()
                        } else {
                            this.appService.msgUpdate()
                        }

                        this.setearForm();
                        //this.llenarListBancos();
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
        this.formAnulaRecib.reset();
        this.iniciarForms();
        //this.recibos=null;
    }

    cancelar() {
        this.CloseModal();
        /* this.f.estadoCompr.disable();
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada');
        this.display = false; */
    }

    cerrar() {
        /*  this.f.estadoCompr.disable();
        this.formEstadoFact.reset();
        this.iniciarForms();
        this.display = false; */
    }
    onDisplayForm() {
        this.display = true;
        console.log('abriendo modal');
    }

    CloseModal() {
        this.closeModal.emit();
        console.log('cerrando modal');
        //this.formAnulaRecib.reset(); //!Activar déspues
    }
}
