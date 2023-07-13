import {Component, Input, OnInit} from '@angular/core';
import {EntidadDto} from "../../model/EntidadDto";
import {ResponseGenerico} from "../../../../../_dto/response-generico";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../../_service/app.service";
import {TokenService} from "../../../../../_service/token.service";
import {BreadcrumbService} from "../../../../../_service/utils/app.breadcrumb.service";
import {severities} from "../../../../../_enums/constDomain";
import {TokenDto} from "../../../../../_dto/token-dto";

@Component({
    selector: 'app-entidad',
    templateUrl: './entidad.component.html',
    styleUrls: ['./entidad.component.scss']
})
export class EntidadComponent implements OnInit {

    @Input() tipoServicio: EntidadDto;

    proceso: string = 'tipoServicio'

    response: ResponseGenerico
    formTipoServicio: FormGroup
    listTipoServicio: EntidadDto[] = [];

    token: TokenDto;


    constructor(
        public appService: AppService,
        private formBuilder: FormBuilder,
        private tokenService: TokenService,
        private breadcrumbService: BreadcrumbService,

    ) {
        this.breadcrumbService.setItems([{label: 'Tipo Servicio'}]);
    }

    ngOnInit() {
        this.iniciarForms()


    }

    iniciarForms() {
        this.formTipoServicio = this.formBuilder.group({
            idTipoServicio: new FormControl('',),
            nombreTipo: new FormControl('', Validators.compose([Validators.required])),
            detalleTipo: new FormControl('', Validators.compose([Validators.required])),
            fechaCreacionTipo: new FormControl('', Validators.compose([Validators.required])),
            usuarioCreacion: new FormControl('', Validators.compose([Validators.required])),
            //servicioListDto: new FormControl('', Validators.compose([Validators.required])),
        });

        this.token = JSON.parse(this.tokenService.getResponseAuth());
        this.f.usuarioCreacion.setValue(this.token.id)
        this.f.fechaCreacionTipo.setValue(new Date())


    }

    get f() {
        return this.formTipoServicio.controls;
    }

    setSeleccionado(obj) {
        this.tipoServicio = obj;
        this.formTipoServicio = this.formBuilder.group(this.tipoServicio);
        // this.f.fechaCreacionServicioLab.setValue(new Date(this.Servicio.fechaCreacionServicioLab).toLocaleString())
    }

    /**
     * Métodos para funcionalidad de la pagina
     * **/




    setearForm() {
        this.formTipoServicio.reset();
        this.iniciarForms();
    }

    cancelar() {
        this.setearForm();
        this.appService.msgInfoDetail('info', '', 'Acción Cancelada')
    }

}
