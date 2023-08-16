import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormaPagoService } from '../../services/formaPago.service';
import { FormaPago } from '../../model/FormaPago';
import { severities } from 'src/app/_enums/constDomain';

@Component({
    selector: 'app-list-forma-pago',
    templateUrl: './list-forma-pago.component.html',
    styleUrls: ['./list-forma-pago.component.css'],
})
export class ListFormaPagoComponent implements OnInit {
    @Input() display: boolean = false;
    @Output() closeModal = new EventEmitter();

    listFormaPago: FormaPago[] = [];
    nombreFp: string = '';
    selectedRecord: any;

    constructor(
        private appService: AppService,
        private breadcrumbService: BreadcrumbService,
        private formapagoService: FormaPagoService
    ) {
        {
            this.breadcrumbService.setItems([
                { label: 'Factura Otros Conceptos ' },
            ]);
        }
    }

    ngOnInit() {
        this.llenarListFormaPago();
    }

    onDisplayForm() {
        this.display = true;
        console.log('abriendo modal');
    }

    CloseModal() {
        this.closeModal.emit();
        console.log('cerrando modal de modal emit');
    }

    async llenarListFormaPago() {
        await this.formapagoService.getAll().subscribe({
            next: (data) => {
                this.listFormaPago = data.listado;
                console.log('CORRECTO');
                console.log(this.listFormaPago);
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

    showAttributes(record: any) {
        this.selectedRecord = record;
      
        // Actualiza las variables con los valores del registro seleccionado
      
        this.nombreFp = this.selectedRecord.nombreFp;
      }
      


}
