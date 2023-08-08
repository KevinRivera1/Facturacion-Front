import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
    selector: 'app-list-forma-pago',
    templateUrl: './list-forma-pago.component.html',
    styleUrls: ['./list-forma-pago.component.css'],
})
export class ListFormaPagoComponent implements OnInit {
    formListPago: FormGroup;
    @Input() pago: boolean = false;
    @Output() cerrarpago = new EventEmitter();

    constructor(
        private appService: AppService,
        private breadcrumbService: BreadcrumbService
    ) {
        {
            this.breadcrumbService.setItems([
                { label: 'Factura Otros Conceptos ' },
            ]);
        }
    }

    ngOnInit() {}

    get f() {
        return this.formListPago.controls;
    }

    cancelar() {
        this.cerrarPago();
    }

    abrirPago() {
        this.pago = true;
    }

    cerrarPago() {
        this.cerrarpago.emit();
    }
}
