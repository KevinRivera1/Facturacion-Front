import { Component, Input, OnInit } from '@angular/core';
import { TipoConceptoDto } from '../../model/TipoConcepto.dto';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TokenDto } from 'src/app/_dto/token-dto';
import { AppService } from 'src/app/_service/app.service';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

import { severities } from 'src/app/_enums/constDomain';
import { Unidad } from '../../model/Unidad';
import { UnidadDto } from '../../model/UnidadDTO';
import { TipoConceptoService } from '../../services/tipoConcepto.service';
import { EstadoComprobanteDto } from '../../model/EstadoComprobanteDto';
   
@Component({
    selector: 'app-tipo-concepto',
    templateUrl: './tipo-concepto.component.html',
    styleUrls: ['./tipo-concepto.component.css'],
})
export class TipoConceptoComponent implements OnInit {
    @Input() tipoConcepto: TipoConceptoDto;
    @Input() estadoTC: TipoConceptoDto;
    modal: boolean;

    @Input() display: boolean;

    proceso: string = 'tipoConcepto';

    response: ResponseGenerico;

    selectedItemUnidad: UnidadDto[];

    formtipoConcepto: FormGroup;

    listTipoConcepto: TipoConceptoDto[] = [];

    token: TokenDto;
    cols: any[];

    listUnidad: UnidadDto[] = [];

   // Unidad: UnidadDto;

    loading: boolean;

    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,

        private tipoConceptoService: TipoConceptoService
    ) {
        this.breadcrumbService.setItems([{ label: 'TIPO CONCEPTO ' }]);
    }

    ngOnInit(): void {
        this.iniciarForms();
        this.llenarListTipoConcepto();
        this.lista();
        this.llenarListUnidad();
    }

    get f() {
        return this.formtipoConcepto.controls;
    }

    iniciarForms() {
        /*
  descTipoConcepto: string;
    fechaTc: Date;
    idTipoConcepto: number;
    idUnidadTc: number;
    idUsuarioTc: number;
    nombreTipoConcepto: string;
    partida: number;
    estadoTc: string;
    */
        this.formtipoConcepto = this.formBuilder.group({
            idTipoConcepto: new FormControl(null),
            nombreTipoConcepto: new FormControl(''),
            descTipoConcepto: new FormControl(''),
            estadoTC: new FormControl(
                true,
                Validators.compose([Validators.requiredTrue])
            ),
            fechaTc: new FormControl(new Date().toLocaleDateString()),
            partida: new FormControl(''),
            idUsuarioTc: new FormControl(''),
            idUnidadTc: new FormControl(''),
            // idUnidad: new FormControl(''),
            //nombreU: new FormControl(''),
        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
        //  this.f.idFormaPago.setValue(this.token.id)
    }

    loadData(event) {
        this.loading = true;
        setTimeout(() => {
            this.tipoConceptoService.getAllUn().subscribe((res) => {
                this.listUnidad = res;
                console.log('LLAMADA');
                console.log(this.listUnidad);
                this.loading = false;
            });
        }, 1000);
    }

    setSeleccionado(obj) {
        this.tipoConcepto = obj;
        this.formtipoConcepto = this.formBuilder.group(this.tipoConcepto);
        this.f.estadoTC.setValue(this.tipoConcepto.estadoTC === 'ACTIVO');

    /*     this.f.fechaTc.setValue(
            new Date(this.tipoConcepto.fechaTc).toISOString()
        ); */

        /* const fecha = new Date(this.tipoConcepto.fechaTc);
const year = fecha.getFullYear();
const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
const day = fecha.getDate().toString().padStart(2, '0');
const fechaSinHora = `${year}/${month}/${day}`;
this.f.fechaTc.setValue(fechaSinHora); */
        console.log('EMITI', this.tipoConcepto);
    }

    async llenarListTipoConcepto() {
        await this.tipoConceptoService.getAll().subscribe({
            next: (data) => {
                this.listTipoConcepto = data.listado;
                console.log('CORRECTO');
                console.log(this.listTipoConcepto);
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

    async llenarListUnidad() {
        await this.tipoConceptoService.getAllUn().subscribe({
            next: (data) => {
                this.listUnidad = data.listado;
                console.log('CORRECTO');
                console.log(this.listUnidad);
            },
            complete: () => {
                //this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente')
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

    guardarTipoConcepto() {
        if (this.formtipoConcepto.invalid) {
            this.appService.msgInfoDetail(
                'warn',
                'Verificación',
                'Verificar los Datos a Ingresar'
            );
            return;
        } else {
            // alert(this.formFormaPago.value.descripcionFp);

            //   if(this.formFormaPago.value.idFormaPago!=null){

            /*
 idTipoConcepto: new FormControl(null,),
        nombreTipoConcepto
        descTipoConcepto
        estadoTc
        fechaTc
        partida
        idUsuarioTc
        idUnidadTc
          
       */
            this.tipoConcepto = this.formtipoConcepto.value;
            // this.tipoConcepto.idTipoConcepto= this.f.idTipoConcepto.value;
            this.tipoConcepto.nombreTipoConcepto =
                this.f.nombreTipoConcepto.value;
            this.tipoConcepto.descTipoConcepto = this.f.descTipoConcepto.value;
            this.tipoConcepto.partida = this.f.partida.value;
            this.tipoConcepto.idUsuarioTc = this.token.id;
            
            this.tipoConcepto.idUnidadTc = this.f.idUnidadTc.value;
            //   this.Unidad.nombreU=  this.f.nombreU.value;

            if (this.tipoConcepto.idTipoConcepto != null) {
                this.tipoConcepto.fechaTc = new Date(this.tipoConcepto.fechaTc);
            } else {
                this.tipoConcepto.fechaTc = new Date();
            }

            if (this.formtipoConcepto.value.estadoTC) {
                this.tipoConcepto.estadoTC = 'ACTIVO';
            } else {
                this.tipoConcepto.estadoTC = 'INACTIVO';
            }

            // Verificar si el registro ya existe

            const nombreTipoConcepto = this.f.nombreTipoConcepto.value;
            const descTipoConcepto = this.f.descTipoConcepto.value;

            if (
                this.existeRegistro(
                    nombreTipoConcepto,
                    descTipoConcepto,
                    this.tipoConcepto.idTipoConcepto
                )
            ) {
                this.appService.msgInfoDetail(
                    'warn',
                    'Registro Duplicado',
                    'Este registro ya existe'
                );
                return;
            }
             


            this.tipoConceptoService.saveObject(this.tipoConcepto).subscribe({
                next: (data) => {
                    this.response = data;
                    if (this.response.codigoRespuestaValue == 200) {
                        if (!this.tipoConcepto.idTipoConcepto) {
                        
                            this.appService.msgCreate();
                        } else {
                            this.appService.msgUpdate();
                        }

                        this.setearForm();
                        this.llenarListTipoConcepto();
                    }
                },
                complete: () => {},
                error: (error) => {},
            });
        }
        this.modal = false;
    }

    //   listCatalogoUnidad() {
    //     // Aquí puedes obtener el listado de unidades desde una API o servicio
    //     // Por ahora, lo declaramos aquí como ejemplo
    //     this.selectedItemUnidad = [
    //       {
    //         "idUnidad": 18,
    //         "nombreU": "DEPARTAMENTO DE AUTOMATIZACION Y CONTROL INDUSTRIAL"
    //       },
    //       // Puedes agregar más elementos al listado si es necesario
    //     ];
    //   }


    
 

    setearForm() {
        this.formtipoConcepto.reset();
        this.iniciarForms();
        this.tipoConcepto = null;
    }


    private existeRegistro(
        nombreTipoConcepto: string,
        descTipoConcepto: string,
        idTipoConcepto: number
    ): boolean {
        // Estamos en modo creación o edición, realizamos la validación de duplicados.
        return this.listTipoConcepto.some(
            (tipoConcepto) =>
                (tipoConcepto.nombreTipoConcepto === nombreTipoConcepto ||
                    tipoConcepto.descTipoConcepto === descTipoConcepto) &&
                    tipoConcepto.idTipoConcepto !== idTipoConcepto
        );
    }
    
    lista() {
        this.cols = [{ field: 'idUnidad' }, { field: 'nombreU' }];
    }

    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada');
        this.modal = false;
    }
    abrirmodal() {
        this.modal = true;
    }
    cerrar() {
        this.formtipoConcepto.reset();
        this.iniciarForms();
        this.modal = false;
    }
}
