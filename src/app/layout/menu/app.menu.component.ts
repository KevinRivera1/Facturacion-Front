import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../content/app.main.component';
import { TokenService } from '../../_service/token.service';
import { MenuService } from './app.menu.service';
import { MenuLightService } from '../../_service/menu.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[];
    model2: any[];

    items: MenuItem[];
    menus: any;

    menuSubscription: Subscription;

    constructor(
        public appMain: AppMainComponent,
        private tokenService: TokenService,
        private menuService: MenuLightService
    ) {}

    ngOnInit() {
        this.model = [
            {
                label: '',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            { separator: true },
        ];

        this.model2 = [
            { separator: true },
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'EPN',
                        icon: 'pi pi-fw pi-globe',
                        url: ['https://epn.edu.ec'],
                    },
                    {
                        label: 'Manual',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: ['/documentation'],
                    },
                ],
            },
        ];

        this.llenarMenus();
    }

    menuItems = [
        {
            label: 'Catalogos',
            items: [
                {
                    label: 'Forma pago',
                    icon: 'pi pi-check',
                    routerLink: ['/formapago'],
                },
                {
                    label: 'Estado Comprobante',
                    icon: 'pi pi-check',
                    routerLink: ['/estadoComprobante'],
                },
                {
                    label: 'Conceptos',
                    icon: 'pi pi-check',
                    routerLink: ['/conceptos'],
                },
                {
                    label: 'Tipo Concepto',
                    icon: 'pi pi-check',
                    routerLink: ['/tipoConcepto'],
                },
                {
                    label: 'Centro Costo',
                    icon: 'pi pi-check',
                    routerLink: ['/centroCostos'],
                },
                {
                    label: 'Punto Factura',
                    icon: 'pi pi-check',
                    routerLink: ['/punto-fac'],
                },
                {
                    label: 'Factura Laboratorio',
                    icon: 'pi pi-check',
                    routerLink: ['/factura-lab'],
                },

                {
                    label: 'Factura Matricula',
                    icon: 'pi pi-check',
                    routerLink: ['/factura-matricula']
                },
                {
                    label: 'Factura Otros Conceptos',
                    icon: 'pi pi-check',
                    routerLink: ['/otros_conceptos'],
                },
                {
                    label: 'Nota de Credito',
                    icon: 'pi pi-check',
                    routerLink: ['/nota-credito'],
                },
                {
                    label: 'Anular Recibo',
                    icon: 'pi pi-check',
                    routerLink: ['/anular-reciboCaja'],
                },
               
                {
                    label: 'Recibo de Caja',
                    icon: 'pi pi-check',
                    routerLink: ['/reciboC'],
                },
                {
                    label: 'Factura Otros Conceptos',
                    icon: 'pi pi-check',
                    routerLink: ['/otros_conceptos'],
                },
                
            ],
        },
    ];

    llenarMenus() {
        //console.log('GET MENU JSON APP ', this.menuService.getMenusJson())
        if (
            this.menuService.getMenusJsonLab() === null ||
            this.menuService.getMenusJsonLab() === 'null'
        ) {
            if (
                this.menuService.getMenusJson() === null ||
                this.menuService.getMenusJson() === 'null'
            ) {
                this.menuService
                    .findByUsername(this.tokenService.getCurrentUser())
                    .subscribe(
                        (data) => {
                            this.menus = data;

                            this.items = new Array();
                            console.log(
                                '🚀 ~ file: app.menu.component.ts:86 ~ AppMenuComponent ~ llenarMenus ~ items:',
                                this.items
                            );

                            for (let objMenu of this.menus) {
                                let item: MenuItem;
                                item = {
                                    label: objMenu.itemDTO.label,
                                    icon: objMenu.itemDTO.icon,
                                    url: objMenu.itemDTO.url,
                                    routerLink: objMenu.itemDTO.routerLink,
                                    items: objMenu.itemsDTO,
                                    badge: objMenu.badge,
                                };
                                this.items.push(item);
                                this.menuService.setMenusJson(this.items);
                            }
                        },
                        (err) => {
                            console.log('status ' + err.status);
                            console.log('error message ' + err.error.message);
                            console.log('error ' + err.error);
                            console.log('message ' + err.message);
                        }
                    );
            } else {
                console.log('carga menu app session ');
                this.items = new Array();
                this.items = JSON.parse(this.menuService.getMenusJson());
            }
        } else {
            this.items = new Array();
            console.log('carga menu lab session ');
            this.items = JSON.parse(this.menuService.getMenusJsonLab());
        }
    }
}
