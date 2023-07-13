import { Routes } from '@angular/router';
import {DashboardDemoComponent} from "../components/dashboarddemo.component";

export const RUTA_DASHBOARD: Routes = [
  {
    path: 'dashboard',
    component: DashboardDemoComponent,
    //canActivate: [AuthGuard],
  },

];
