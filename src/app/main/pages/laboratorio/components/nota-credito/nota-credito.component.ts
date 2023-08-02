import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-nota-credito',
  templateUrl: './nota-credito.component.html',
  styleUrls: ['./nota-credito.component.css']
})
export class NotaCreditoComponent implements OnInit {

  display: boolean = false;
  formListFac: FormGroup;

  constructor(

    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Nota de Credito ' }]);
    }
  }

  ngOnInit() {
  }

  abrirmodal() {
    this.display = true;
}

  cerrar() {
    this.display = false;
}

}
