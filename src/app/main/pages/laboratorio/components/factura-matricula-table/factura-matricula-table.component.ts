import { Component, Input, OnInit } from '@angular/core';
import { FacturaDto } from '../../model/Factura.dto';
import { FacturaService } from '../../services/factura.service';
import { severities } from 'src/app/_enums/constDomain';
import { AppService } from 'src/app/_service/app.service';

@Component({
  selector: 'app-factura-matricula-table',
  templateUrl: './factura-matricula-table.component.html',
  styleUrls: ['./factura-matricula-table.component.css']
})
export class FacturaMatriculaTableComponent implements OnInit {
  proceso: string = 'formapago';
  @Input() listFactura: any [] = [];
  loading: boolean;

  modal: boolean;
  clienteSelect:FacturaDto;

  constructor(

    private facturaService: FacturaService,
    public appService: AppService,
    
    ) { }

  async llenarFacturaMatricula() {
    await this.facturaService.getAll().subscribe({
        next: (data) => {
            this.listFactura = data.listado;
            console.log('CORRECTO');
            console.log(this.listFactura);
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

  loadData(event) {
    this.loading = true;
    setTimeout(() => {
        this.facturaService.getAll().subscribe((res) => {
            this.listFactura = res;
            console.log('LLAMADA');
            console.log(this.listFactura);
            this.loading = false;
        });
    }, 1000);
}

cargarfactura(clienteSelectDto: FacturaDto ){
  this.clienteSelect= clienteSelectDto;
  this.abrirmodal();

}

abrirmodal() {
  this.modal = true;
}
cerrar() {

this.modal = false;


}

  ngOnInit() {
    this.llenarFacturaMatricula();
    this.clienteSelect= new FacturaDto();

  }

  filtrarFactura(listFactura:any[]){
    this.listFactura = listFactura
  }

}
