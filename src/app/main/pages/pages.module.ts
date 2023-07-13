import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*Modulos*/

import { EntidadModule } from './laboratorio/module/entidad.module';
import { DashboardModule } from '../dashboard/module/dashboard.module';
import { ProductService } from '../dashboard/services/productservice';
import { ConceptoLiquidacionComponent } from './laboratorio/components/concepto-liquidacion/concepto-liquidacion.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { PrimengModule } from '../../primeng/primeng.module';
import { ConceptoLiquidacionTableComponent } from './laboratorio/components/concepto-liquidacion-table/concepto-liquidacion-table.component';
import { CretencionComponent } from './laboratorio/components/cretencion/cretencion.component';
import { CretencionTableComponent } from './laboratorio/components/cretencion-table/cretencion-table.component';
import { EstadoFacturaComponent } from './laboratorio/components/estado-factura/estado-factura.component';
import { FormaPagoComponent } from './laboratorio/components/forma-pago/forma-pago.component';
import { ConceptoComponent } from './laboratorio/components/concepto/concepto.component';
import { ConceptosTableComponent } from './laboratorio/components/concepto-table/concepto-table.component';
import { FormaPagoTableComponent } from './laboratorio/components/forma-pago-table/forma-pago-table.component';
import { EstadoFacturaTableComponent } from './laboratorio/components/estado-factura-table/estado-factura-table.component';

@NgModule({
    declarations: [
        ConceptoLiquidacionComponent,
        ConceptoLiquidacionTableComponent,
        CretencionComponent,
        CretencionTableComponent,
        FormaPagoComponent,
        FormaPagoTableComponent,
       
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        EntidadModule,
        DashboardModule,
        InputSwitchModule,
        InputNumberModule,
        PrimengModule,
    ],

    providers: [ProductService],
})
export class PagesModule {}
