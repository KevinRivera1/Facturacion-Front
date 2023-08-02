import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';

@Component({
  selector: 'app-recibo-caja',
  templateUrl: './recibo-caja.component.html',
  styleUrls: ['./recibo-caja.component.scss']
})
export class ReciboCajaComponent implements OnInit {
  constructor(

    private breadcrumbService: BreadcrumbService
  ) {
    {
      this.breadcrumbService.setItems([{ label: 'Recibo Caja ' }]);
    }
  }

  ngOnInit() {
  }
}
