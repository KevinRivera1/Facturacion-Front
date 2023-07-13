import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './layout/content/app.main.component';
import {AppNotfoundComponent} from './main/notfound/app.notfound.component';
import {AppErrorComponent} from './main/error/app.error.component';
import {AppAccessdeniedComponent} from './main/forbidden/app.accessdenied.component';
import {AppLoginComponent} from './main/pages/login/app.login.component';
import {AppHelpComponent} from './main/help/app.help.component';

import {DashboardDemoComponent} from "./main/dashboard/components/dashboarddemo.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./_guards/auth.guard";


const appRoutes: Routes = [
    {
        path: '', component:AppMainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
    },
    {
        path: 'authentication/login', component:AppLoginComponent,
    },
    {path: 'error', component: AppErrorComponent},
    {path: 'access', component: AppAccessdeniedComponent},
    {path: 'notfound', component: AppNotfoundComponent},
    {path: '**', redirectTo: '/notfound'},
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
