import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormaPagoService } from '../../services/formaPago.service';
import { FormaPago } from '../../model/FormaPago';
import { severities } from 'src/app/_enums/constDomain';
import { FormaPagoDto } from '../../model/FormaPago.dto';
import { SelectItem } from 'primeng/api/selectitem';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

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
    idFormaPago: string = '';

    constructor(
        private appService: AppService,
        private breadcrumbService: BreadcrumbService,
        private formapagoService: FormaPagoService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
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
      this.idFormaPago = this.selectedRecord.idFormaPago;
        this.nombreFp = this.selectedRecord.nombreFp;
        console.log('idFormaPago: ' + this.idFormaPago);
      }


      bancos: SelectItem[] = [

        { label: 'Pichincha', value: 'Pichincha' },
        { label: 'Guayaquil', value: 'Guayaquil' },
      ];
      tarjeta: SelectItem[] = [

        { label: 'Debito', value: 'Debito' },
        { label: 'Credito', value: 'Credito' },
      ];


  guardarpago(){
 
    this.confirmationService.confirm({
        message: 'El total de la factura no ha sido pagada completamente Esta seguro que desea cancelar el pago mixto?',
        header: 'Mensaje...',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Usted a aceptado' });
            this.closeModal.emit();
        },
        reject: (type: any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Usted a cancelado' });
                    break;
                    
            }
        }
    });
  }
}
