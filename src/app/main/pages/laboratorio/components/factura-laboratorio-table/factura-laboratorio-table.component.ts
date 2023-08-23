import { Component, Input, OnInit } from '@angular/core';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { DetalleFacturaService } from '../../services/detalleFactura.service';
import { DetalleFacturaDto } from '../../model/DetalleFactura.dto';

@Component({
  selector: 'app-factura-laboratorio-table',
  templateUrl: './factura-laboratorio-table.component.html',
  styleUrls: ['./factura-laboratorio-table.component.scss']
})
export class FacturaLaboratorioTableComponent implements OnInit {
  
  @Input() listfacturalaboratorio:  any [] = [];
  modal: boolean;
  loading: boolean;
  clienteSelect: DetalleFacturaDto;


  //selectedTc: TipoConceptoDto[];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private detalleFacturaService: DetalleFacturaService,
    private facturaService: FacturaService,
    public appService: AppService,
   
   



  ) {
    
   
   }

  ngOnInit() {
    this.clienteSelect= new DetalleFacturaDto();
   // this.llenardetalleFacturalaboratorio();
  }


  async llenardetalleFacturalaboratorio() {
    await this.detalleFacturaService.getAll().subscribe({
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


  cargarfactura(clienteSelectDto: DetalleFacturaDto){
    this.clienteSelect= clienteSelectDto;
    this.abrirmodal();
    
  }


  abrirmodal() {
    this.modal = true;
}
cerrar() {

  this.modal = false;
  

}

filtrarFacturas(listfacturalaboratorio:any[]){
  this.listfacturalaboratorio = listfacturalaboratorio
}



}