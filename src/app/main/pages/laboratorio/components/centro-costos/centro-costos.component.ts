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
    @Input() centros: CentroCostoDto;

    modal: boolean;

    visible:boolean= false;
    visibleBusqCl:boolean=false;


    proceso: string = 'CentroCostos';

    response: ResponseGenerico;

    formCentroCo: FormGroup;

    listCentrosCo: CentroCostoDto[] = [];

    token: TokenDto;

    
    // private contadorCentroCosto: number = 1;

    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,
        private CentroCostosService: CentroCostosService
        
    ) {
        this.breadcrumbService.setItems([{ label: 'Centro Costos' }]);
    }

    ngOnInit(): void {
        this.iniciarForms();
        this.llenarListCentro();

        
    }

    iniciarForms() {
        this.formCentroCo = this.formBuilder.group({
            idCentroCosto: new FormControl(null),
            codCentroCosto: new FormControl('',Validators.compose([Validators.required])),
            nombreCentroCosto: new FormControl('',Validators.compose([Validators.required])),
            descCentroCosto: new FormControl('',Validators.compose([Validators.required])),
            estadoCentroCosto: new FormControl(true, Validators.compose([Validators.requiredTrue])),
            fechaCentroCosto: new FormControl(new Date().toLocaleDateString(),Validators.compose([Validators.required])
            ),
        });
        this.token = JSON.parse(this.tokenService.getResponseAuth());
    }

    get f() {
        return this.formCentroCo.controls;
    }

    setSeleccionado(obj) {
        this.centros = obj;
        this.formCentroCo = this.formBuilder.group(this.centros);
         this.f.estadoCentroCosto.setValue(this.centros.estadoCentroCosto === 'ACTIVO');

        //  this.f.codCentroCosto.setValue(this.centros.codCentroCosto =="0000");
        // this.f.fechaCentroCosto.setValue(
        //     new Date(this.centros.fechaCentroCosto).toLocaleString()
        // );
        console.log('EMITI', this.centros);

    }

    async llenarListCentro() {
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
                    'Datos Cargados exitosamente'
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



    private formatNumber(num: string): string {
        return `SC-${num.toString().padStart(5, '0')}`;
    }

    
    guardarCentro() {
        if (this.formCentroCo.invalid) {
          this.appService.msgInfoDetail(
            'warn',
            'Verificación',
            'Verificar los Datos a Ingresar'
          );
          return;
        }
        
        this.centros = this.formCentroCo.value;
        this.centros.nombreCentroCosto = this.f.nombreCentroCosto.value;
        // this.centros.codCentroCosto = this.formatNumber(this.f.codCentroCosto.value);
        this.centros.codCentroCosto = this.f.codCentroCosto.value;
        this.centros.descCentroCosto = this.f.descCentroCosto.value;
        this.centros.estadoCentroCosto = this.formCentroCo.value.estadoCentroCosto ? 'ACTIVO' : 'INACTIVO';
        this.centros.idUsuarioCentroCosto = this.token.id;;
          

        if (this.centros.idCentroCosto) {
          this.centros.fechaCentroCosto = new Date(this.centros.fechaCentroCosto);
        } else {
          this.centros.fechaCentroCosto = new Date();
        }      
      

        //VALIDACION
        const nombreCentroCosto = this.f.nombreCentroCosto.value;
        const codCentroCosto = this.f.codCentroCosto.value;

        if (this.existeRegistro(nombreCentroCosto, codCentroCosto)) {
            this.appService.msgInfoDetail('warn', 'Registro Duplicado', 'Este registro ya existe');
            return;
        }


        this.CentroCostosService.saveObjectC(this.centros).subscribe({
          next: (data) => {
            this.response = data;
            console.log(this.response);
            if (this.response.codigoRespuestaValue == 200) {
              if (!this.centros.idCentroCosto) {
                
                this.appService.msgCreate();
              } else {
                this.appService.msgUpdate();
                console.log(this.response)
              }
      
              this.setearForm();
              this.llenarListCentro();
            }
          },
          complete: () => {},
          error: (error) => {},
        });
        this.modal = false;
      }
      

      private existeRegistro(
        nombreCentroCosto: string, 
        codCentroCosto: string): 
        boolean {
        // Estamos en modo creación, realizamos la validación de duplicados.
        return this.listCentrosCo.some(
        (centro)=>
            (centro.nombreCentroCosto == nombreCentroCosto ||
             centro.codCentroCosto == codCentroCosto  )         
        );
    }


    setearForm() {
        this.formCentroCo.reset();
        this.iniciarForms();
       // this.centros = null;
    }

    cancelar() {
      this.setearForm();
      this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
      this.modal = false;
    }

  
    abrirmodal(){
        this.modal = true;
    }
    cerrar(){
        this.setearForm();
        this.modal = false;
    
    }
    
}









































