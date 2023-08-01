import {Routes} from '@angular/router';

import {AuthGuard} from "../../../../_guards/auth.guard";

import {EntidadComponent} from "../components/entidad/entidad.component";
import {BancosComponent} from "../components/bancos/bancos.component";
import {ConceptoLiquidacionComponent} from "../components/concepto-liquidacion/concepto-liquidacion.component";
import {CretencionComponent} from "../components/cretencion/cretencion.component";
import { CentroCostosComponent } from '../components/centro-costos/centro-costos.component';

import { FormaPagoComponent } from '../components/forma-pago/forma-pago.component';
import { ConceptoComponent } from '../components/concepto/concepto.component';
import { TipoConceptoComponent } from '../components/tipo-concepto/tipo-concepto.component';
import { PuntoFacturacionComponent } from '../components/punto-facturacion/punto-facturacion.component';
import { EstadoComprobanteComponent } from '../components/estado-comprobante/estado-comprobante.component';
import { AnularResiboCajaComponent } from '../components/anular-resibo-caja/anular-resibo-caja.component';



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
        path: 'anular-reciboCaja',
        component: AnularResiboCajaComponent,
        canActivate: [AuthGuard],
    }
 


];
