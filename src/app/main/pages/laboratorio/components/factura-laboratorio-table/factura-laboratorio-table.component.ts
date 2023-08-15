import { Component, Input, OnInit } from '@angular/core';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';

@Component({
  selector: 'app-factura-laboratorio-table',
  templateUrl: './factura-laboratorio-table.component.html',
  styleUrls: ['./factura-laboratorio-table.component.scss']
})
export class FacturaLaboratorioTableComponent implements OnInit {
  
  @Input() listfacturalaboratorio: FacturaDto[];
  modal: boolean;
  loading: boolean;
  clienteSelect:FacturaDto;


  constructor(
    private facturaService: FacturaService,

  ) { }

  ngOnInit() {

    
  }






  cargarfactura(clienteSelectDto: FacturaDto ){
    this.clienteSelect= clienteSelectDto;
    

  }

  
  loadData() {
    this.loading = true;
    setTimeout(() => {
        this.facturaService.getAll().subscribe((res) => {
            this.listfacturalaboratorio = res;
            console.log('LLAMADA');
            console.log(this.listfacturalaboratorio);
            this.loading = false;
        });
    }, 1000);
}

  abrirmodal() {
    this.modal = true;
}
cerrar() {

  this.modal = false;
  

}
}
