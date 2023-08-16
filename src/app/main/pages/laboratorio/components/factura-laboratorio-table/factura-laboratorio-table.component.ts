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
   

  ) { }

  ngOnInit() {
    this.clienteSelect= new FacturaDto();
    
  }


  cargarfactura(clienteSelectDto: FacturaDto){
    this.clienteSelect= clienteSelectDto;
    this.abrirmodal();
    

  }


  abrirmodal() {
    this.modal = true;
}
cerrar() {

  this.modal = false;
  

}

formatearFecha(fecha: number): string {
  const date = new Date(fecha);
  const anio = date.getFullYear();
  const mes = ('0' + (date.getMonth() + 1)).slice(-2);
  const dia = ('0' + date.getDate()).slice(-2);

  return `${dia}/${mes}/${anio}`;
}
}
