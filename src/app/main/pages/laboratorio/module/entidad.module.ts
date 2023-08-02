import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {TooltipModule} from "primeng/tooltip";


import {RUTA_ENTIDAD} from "../routes/entidad.routing";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PanelModule } from 'primeng/panel';
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";

import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {DividerModule} from "primeng/divider";

import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";

import {SpeedDialModule} from "primeng/speeddial";
import {AutoCompleteModule} from "primeng/autocomplete";
import {PrimengModule} from "src/app/primeng/primeng.module";

import {ScrollPanelModule} from 'primeng/scrollpanel';

import {EntidadComponent} from "../components/entidad/entidad.component";
import {EntidadTableComponent} from "../components/entidad-table/entidad-table.component";

import {CdkTableModule} from "@angular/cdk/table";
import {BancosComponent} from "../components/bancos/bancos.component";
import {BancosTableComponent } from "../components/bancos-table/bancos-table.component";
import { ConceptoComponent } from '../components/concepto/concepto.component';
import { FormaPagoComponent } from '../components/forma-pago/forma-pago.component';
import { ConceptosTableComponent } from '../components/concepto-table/concepto-table.component';
import { CentroCostosComponent } from '../components/centro-costos/centro-costos.component';
import { CentroCostosTableComponent } from '../components/centro-costos-table/centro-costos-table.component';

import { TipoConceptoTableComponent } from '../components/tipo-concepto-table/tipo-concepto-table.component';
import { PuntoFacturacionComponent } from '../components/punto-facturacion/punto-facturacion.component';
import { PuntoFacturacionTableComponent } from '../components/punto-facturacion-table/punto-facturacion-table.component';

import { EstadoComprobanteTableComponent } from '../components/estado-comprobante-table/estado-comprobante-table.component';
import { EstadoComprobanteComponent } from '../components/estado-comprobante/estado-comprobante.component';
import { TipoConceptoComponent } from '../components/tipo-concepto/tipo-concepto.component';
import { AnularResiboCajaComponent } from '../components/anular-resibo-caja/anular-resibo-caja.component';
import { ReciboCajaComponent } from '../components/recibo-caja/recibo-caja.component';
import { FacturaLaboratorioComponent } from '../components/factura-laboratorio/factura-laboratorio.component';
import { FacturaLaboratorioTableComponent } from '../components/factura-laboratorio-table/factura-laboratorio-table.component';




@NgModule({
    declarations: [
        EntidadComponent,
        EntidadTableComponent,
        BancosComponent,
        BancosTableComponent,
        ConceptoComponent,
        ConceptosTableComponent,
        CentroCostosComponent,
        CentroCostosTableComponent,
        TipoConceptoTableComponent,
        PuntoFacturacionComponent,
        PuntoFacturacionTableComponent,
        EstadoComprobanteTableComponent,
        EstadoComprobanteComponent,
        TipoConceptoComponent,
        AnularResiboCajaComponent,
        ReciboCajaComponent,
        FacturaLaboratorioComponent,
        FacturaLaboratorioTableComponent
    ],

    imports: [
        CommonModule,
        RouterModule.forChild(RUTA_ENTIDAD),
        InputTextModule,
        InputNumberModule,
        DialogModule,
        InputTextareaModule,
        FileUploadModule,
        DialogModule,
        ButtonModule,
        CalendarModule,
        TooltipModule,
        DataViewModule,
        DropdownModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        PanelModule,
        StyleClassModule,
        RippleModule,
        ToolbarModule,
        TableModule,
        DividerModule,
        FormsModule,
        SpeedDialModule,
        AutoCompleteModule,
        SpeedDialModule,
        ScrollPanelModule,
        PrimengModule,
        CdkTableModule
    ]
})
export class EntidadModule {
}