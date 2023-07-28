import { Component, OnInit, Input } from '@angular/core';
import { PuntoDto } from "../../model/Punto-fac.dto";
import { ResponseGenerico } from "../../../../../_dto/response-generico";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TokenDto } from "../../../../../_dto/token-dto";
import { AppService } from "../../../../../_service/app.service";
import { TokenService } from "../../../../../_service/token.service";
import { BreadcrumbService } from "../../../../../_service/utils/app.breadcrumb.service";
import { PuntoFacService } from "../../services/punto-fact.service";
import { severities } from "../../../../../_enums/constDomain";
import { UsuarioRelDto } from '../../model/Usuariorel.dto';

@Component({
    selector: 'app-punto-facturacion',
    templateUrl: './punto-facturacion.component.html',
    styleUrls: ['./punto-facturacion.component.css']
})
export class PuntoFacturacionComponent implements OnInit {

    @Input() puntoFac: PuntoDto;

    proceso: string = 'puntoFac';

    response: ResponseGenerico

    formPunto: FormGroup

    listPunto: PuntoDto[] = [];

    token: TokenDto;

    modal: boolean;

    visible: boolean = false;

    loading: boolean;

    cols: any[];

    @Input() listUsuario: UsuarioRelDto[];

    selectedUsuario: UsuarioRelDto[];

    


    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,
        private PuntoService: PuntoFacService
    ) {
        this.breadcrumbService.setItems([{ label: 'PUNTO FACTURACION' }]);
    }

    ngOnInit(): void {
        this.iniciarForms();
        this.llenarListPunto();
        this.llenarListUsuario();
    }

    get f() {
        return this.formPunto.controls;
    }

    loadData(event) {
        this.loading = true;
        setTimeout(() => {
            this.PuntoService.getAllUs().subscribe(res => {
                this.listUsuario = res;
                console.log("LLAMADA");
                console.log(this.listUsuario);
                this.loading = false;
            })
        }, 1000);
    }
   
    iniciarForms() {
        this.formPunto = this.formBuilder.group({
            idPuntoFacturacion: new FormControl(null),
            secuencialPuntoFact: new FormControl('000-000', [
                Validators.required,
                Validators.pattern(/^\d{3}-\d{3}$/)
              ]),
            nombrePuntoFact: new FormControl('', Validators.compose([Validators.required])),
            fechaCreacionPuntoFact: new FormControl(new Date().toLocaleDateString(), Validators.compose([Validators.required])),
            estadoPuntoFact: new FormControl(true, Validators.compose([Validators.requiredTrue])),
            idUsuarioRel: new FormControl(true, Validators.compose([Validators.required])),
        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
    }
    setSeleccionado(obj) {
        this.f.estadoPuntoFact.enable()
        this.puntoFac = obj;
        this.formPunto = this.formBuilder.group({
            idPuntoFacturacion: new FormControl(this.puntoFac.idPuntoFacturacion),
            secuencialPuntoFact: new FormControl(this.puntoFac.secuencialPuntoFact, [
                Validators.required,
                Validators.pattern(/^\d{3}-\d{3}$/)
            ]),
            nombrePuntoFact: new FormControl(this.puntoFac.nombrePuntoFact, Validators.compose([Validators.required])),
            fechaCreacionPuntoFact: new FormControl(new Date(this.puntoFac.fechaCreacionPuntoFact).toLocaleDateString(), Validators.compose([Validators.required])),
            estadoPuntoFact: new FormControl(this.puntoFac.estadoPuntoFact === 'ACTIVO', Validators.compose([Validators.requiredTrue])),
            idUsuarioRel: new FormControl(this.puntoFac.idUsuarioRel, Validators.compose([Validators.required])),
        });
        this.f.estadoPuntoFact.setValue(this.puntoFac.estadoPuntoFact === 'ACTIVO');
    }

    async llenarListPunto() {
        await this.PuntoService.getAll().subscribe({
            next: data => {
                this.listPunto = data.listado;
                console.log("CORRECTO");
                console.log(this.listPunto);
            },
            complete: () => {
                this.appService.msgInfoDetail(severities.INFO, 'INFO', 'Datos Cargados exitosamente');
            },
            error: error => {
                this.appService.msgInfoDetail(severities.ERROR, 'ERROR', error.error);
            }
        })
    }

    async llenarListUsuario() {
        await this.PuntoService.getAllUs().subscribe({
            next: data => {
                this.listUsuario = data.listado;
                console.log("CORRECTO");
                console.log(this.listUsuario);
            },
          
        })
    }

    onSecuencialPunto(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const numericValue = inputElement.value.replace(/\D/g, '');
        inputElement.value = `SC-${numericValue}`;
        this.formPunto.controls['secuencialPuntoFact'].setValue(inputElement.value);
      }

      guardarpunto() {
        if (this.formPunto.invalid) {
            if (this.f.secuencialPuntoFact.errors?.pattern) {
                this.appService.msgInfoDetail(
                    'warn',
                    'Campo Secuencial Incorrecto',
                    'El campo secuencial no cumple con los caracteres esperados (ejemplo: 000-000).'
                );
            } else {
                this.appService.msgInfoDetail(
                    'warn',
                    'Verificación',
                    'Verificar los Datos a Ingresar'
                );
            }
            return;
        }
    
        this.puntoFac = this.formPunto.value;
        this.puntoFac.nombrePuntoFact = this.f.nombrePuntoFact.value;
        this.puntoFac.secuencialPuntoFact = this.f.secuencialPuntoFact.value;
        this.puntoFac.fechaCreacionPuntoFact = this.f.fechaCreacionPuntoFact.value;
        this.puntoFac.idUsuarioRel = this.f.idUsuarioRel.value;
        this.puntoFac.idUsuarioPuntoFact = this.token.id;
    
        if (this.puntoFac.idPuntoFacturacion != null) {
            this.puntoFac.fechaCreacionPuntoFact = new Date(this.puntoFac.fechaCreacionPuntoFact);
        } else {
            this.puntoFac.fechaCreacionPuntoFact = new Date();
        }
    
        this.puntoFac.estadoPuntoFact = this.formPunto.value.estadoPuntoFact ? "ACTIVO" : "INACTIVO";
    
        const nombrePuntoFact = this.f.nombrePuntoFact.value;
        const secuencialPuntoFact = this.f.secuencialPuntoFact.value;
    
        if (this.existeRegistro(nombrePuntoFact, secuencialPuntoFact, this.puntoFac.idPuntoFacturacion)) {
            this.appService.msgInfoDetail(
                'warn',
                'Registro Duplicado',
                'Este registro ya existe'
            );
            return;
        }
    
        this.PuntoService.saveObject(this.puntoFac).subscribe({
            next: (data) => {
                this.response = data;
                if (this.response.codigoRespuestaValue == 200) {
                    if (!this.puntoFac.idPuntoFacturacion) {
                        this.appService.msgCreate();
                    } else {
                        this.appService.msgUpdate();
                    }
    
                    this.setearForm();
                    this.llenarListPunto();
                }
            },
            complete: () => {},
            error: (error) => {},
        });
    
        this.modal = false;
    }
    


    setearForm() {
        this.formPunto.reset();
        this.iniciarForms();
        this.puntoFac = null;
    }

    private existeRegistro(
        nombrePuntoFact: string,
        secuencialPuntoFact: string,
        idPuntoFacturacion: number
    ): boolean {
        // Estamos en modo creación o edición, realizamos la validación de duplicados.
        return this.listPunto.some(
            (punto) =>
                (punto.nombrePuntoFact === nombrePuntoFact ||
                    punto.secuencialPuntoFact === secuencialPuntoFact) &&
                punto.idPuntoFacturacion !== idPuntoFacturacion
        );
    }

    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada');
        this.modal = false;
    }

    closeModal() {
        this.modal = false;
    }

    abrimodal() {
        this.modal = true;
    }

    cerrar() {
        this.formPunto.reset();
        this.f.estadoPuntoFact.disable()
        this.iniciarForms();
        this.modal = false;
    }

}