import { Routes } from '@angular/router';

import { AuthGuard } from '../../../../_guards/auth.guard';

import { EntidadComponent } from '../components/entidad/entidad.component';
import { BancosComponent } from '../components/bancos/bancos.component';
import { ConceptoLiquidacionComponent } from '../components/concepto-liquidacion/concepto-liquidacion.component';
import { CretencionComponent } from '../components/cretencion/cretencion.component';
import { CentroCostosComponent } from '../components/centro-costos/centro-costos.component';

import { FormaPagoComponent } from '../components/forma-pago/forma-pago.component';
import { ConceptoComponent } from '../components/concepto/concepto.component';
import { TipoConceptoComponent } from '../components/tipo-concepto/tipo-concepto.component';
import { PuntoFacturacionComponent } from '../components/punto-facturacion/punto-facturacion.component';
import { EstadoComprobanteComponent } from '../components/estado-comprobante/estado-comprobante.component';
import { ReciboCajaComponent } from '../components/recibo-caja/recibo-caja.component';
import { FactOtrosConceptosComponent } from '../components/fact-otros-conceptos/fact-otros-conceptos.component';
import { AnularReciboCajaComponent } from '../components/anular-recibo-caja/anular-recibo-caja.component';

import { FacturaMatriculaComponent } from '../components/factura-matricula/factura-matricula.component';
import { FacturaLaboratorioComponent } from '../components/factura-laboratorio/factura-laboratorio.component';
import { NotaCreditoComponent } from '../components/nota-credito/nota-credito.component';
import { AnularReciboCajaTableComponent } from '../components/anular-recibo-caja-table/anular-recibo-caja-table.component';
import { ListFormaPagoComponent } from '../components/list-forma-pago/list-forma-pago.component';
import { FacturaLaboratorioTableComponent } from '../components/factura-laboratorio-table/factura-laboratorio-table.component';
import { FacturaMatriculaTableComponent } from '../components/factura-matricula-table/factura-matricula-table.component';
import { ReciboCajaTableComponent } from '../components/recibo-caja-table/recibo-caja-table.component';






export const RUTA_ENTIDAD: Routes = [
    {
        path: 'entidad',
        component: EntidadComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'bancos',
        component: BancosComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'centroCostos',
        component: CentroCostosComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'conceptoLiquidacion',
        component: ConceptoLiquidacionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'cretencion',
        component: CretencionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'estadoComprobante',
        component: EstadoComprobanteComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'formapago',
        component: FormaPagoComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'conceptos',
        component: ConceptoComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'tipoConcepto',
        component: TipoConceptoComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'punto-fac',
        component: PuntoFacturacionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'otros_conceptos',
        component: FactOtrosConceptosComponent
    },
    {  

        path: 'reciboC',
        component: ReciboCajaTableComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'anular-reciboCaja',
        component: AnularReciboCajaTableComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'factura-lab',
        component: FacturaLaboratorioTableComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'factura-matricula',
        component: FacturaMatriculaTableComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'nota-credito',
        component: NotaCreditoComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'forma-pago-fact',
        component: ListFormaPagoComponent,
        canActivate: [AuthGuard],
    }
];
