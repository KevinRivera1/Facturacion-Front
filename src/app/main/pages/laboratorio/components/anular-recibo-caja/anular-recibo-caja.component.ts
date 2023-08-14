import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ResponseGenerico } from 'src/app/_dto/response-generico';
import { TokenDto } from 'src/app/_dto/token-dto';
import { TokenService } from 'src/app/_service/token.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { ReciboCaja } from '../../model/reciboCaja';
import { FormUtil } from '../../formUtil/FormUtil';
import { AppService } from 'src/app/_service/app.service';

@Component({
    selector: 'app-anular-recibo-caja',
    templateUrl: './anular-recibo-caja.component.html',
    styleUrls: ['./anular-recibo-caja.component.scss'],
})
export class AnularReciboCajaComponent implements OnInit {
    formAnulaRecib: FormGroup;
    @Input() display: boolean = false;
    @Output() closeModal = new EventEmitter();
    //? Aqui se define la lista de estados del modal de anular
    estados: any[] = [{ name: 'Anulada', value: 'Anulada' }];

    constructor(
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
            RecibCajaNo: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
            fecha: new FormControl(''),
            cliente: new FormControl(''),
            detalleAnulacion: new FormControl(
                '',
                Validators.compose([Validators.required])
            ),
        });
    }

    guardarMotivoAnulacion() {}

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
        console.log('cerrando modal de modal emit');
    }
}
