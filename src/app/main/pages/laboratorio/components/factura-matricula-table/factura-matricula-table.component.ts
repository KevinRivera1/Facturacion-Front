import { Component, Input, OnInit } from '@angular/core';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-factura-matricula-table',
  templateUrl: './factura-matricula-table.component.html',
  styleUrls: ['./factura-matricula-table.component.css']
})
export class FacturaMatriculaTableComponent implements OnInit {
  proceso: string = 'formapago';
  @Input() listFactura: FacturaDto[];
  loading: boolean;
  constructor(private facturaServcice: FacturaService,) { }


  loadData(event) {
    this.loading = true;
    setTimeout(() => {
        this.facturaServcice.getAll().subscribe((res) => {
            this.listFactura = res;
            console.log('LLAMADA');
            console.log(this.listFactura);
            this.loading = false;
        });
    }, 1000);
}

  ngOnInit() {
  }

}
