import { Component, Input, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { AppService } from 'src/app/_service/app.service';
import { severities } from 'src/app/_enums/constDomain';

@Component({
  selector: 'app-fact-otros-conceptos-table',
  templateUrl: './fact-otros-conceptos-table.component.html',
  styleUrls: ['./fact-otros-conceptos-table.component.css']
})
export class FactOtrosConceptosTableComponent implements OnInit {
  @Input() listfacturaotrosconceptos:  any [] = [];

  constructor(
    private facturaService: FacturaService,
    public appService: AppService,
  ) { 
    
  }

  ngOnInit() {
    //this.llenarFacturalaboratorio();
  }

  filtrarFacturas(listfacturaotrosconceptos:any[]){
    this.listfacturaotrosconceptos = listfacturaotrosconceptos
  }

  
  async llenarFacturalaboratorio() {
    await this.facturaService.getAll().subscribe({
        next: (data) => {
            this.listfacturaotrosconceptos = data.listado;
            console.log('CORRECTO');
            console.log(this.listfacturaotrosconceptos);
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
}
