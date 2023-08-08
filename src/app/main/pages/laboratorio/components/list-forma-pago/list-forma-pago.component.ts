import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-list-forma-pago',
  templateUrl: './list-forma-pago.component.html',
  styleUrls: ['./list-forma-pago.component.css']
})
export class ListFormaPagoComponent implements OnInit {

  @Input() display: boolean = false; 
  @Output() closeModal = new EventEmitter();


  constructor(

    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Factura Otros Conceptos ' }]);
    }
  }


  ngOnInit() {
  }
 
  cancelar() {  
    this.CloseModal()
}

  onDisplayForm() {
    this.display = true;
    console.log('abriendo modal');
}

CloseModal() {
    this.closeModal.emit();
    console.log('cerrando modal de modal emit')
}

 
}
