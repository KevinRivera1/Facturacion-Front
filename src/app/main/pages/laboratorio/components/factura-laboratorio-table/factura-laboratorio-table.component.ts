import { Component, Input, OnInit } from '@angular/core';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';

@Component({
  selector: 'app-factura-laboratorio-table',
  templateUrl: './factura-laboratorio-table.component.html',
  styleUrls: ['./factura-laboratorio-table.component.scss']
})
export class FacturaLaboratorioTableComponent implements OnInit {
  
  @Input() listfacturalaboratorio:  any [] = [];
  modal: boolean;
  loading: boolean;
  clienteSelect:FacturaDto;


  constructor(
    private facturaService: FacturaService,
    public appService: AppService,



  ) { }

  ngOnInit() {
    this.clienteSelect= new FacturaDto();
    //this.llenarFacturalaboratorio();
  }

  async llenarFacturalaboratorio() {
    await this.facturaService.getAll().subscribe({
        next: (data) => {
            this.listfacturalaboratorio = data.listado;
            console.log('CORRECTO');
            console.log(this.listfacturalaboratorio);
        },
        complete: () => {
            this.appService.msgInfoDetail(
                severities.INFO,
                'INFO',
                'Datos Cargados exitosamente' ,
                500
            );
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

/* formatearFecha(fecha: number): string {
  const date = new Date(fecha);
  const anio = date.getFullYear();
  const mes = ('0' + (date.getMonth() + 1)).slice(-2);
  const dia = ('0' + date.getDate()).slice(-2);

  return `${dia}/${mes}/${anio}`;
} */

filtrarFacturas(listfacturalaboratorio:any[]){
  this.listfacturalaboratorio = listfacturalaboratorio
}

}
