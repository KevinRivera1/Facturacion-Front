import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recibo-caja-table',
    templateUrl: './recibo-caja-table.component.html',
    styleUrls: ['./recibo-caja-table.component.scss'],
})
export class ReciboCajaTableComponent implements OnInit {
    modal: boolean;

    constructor() {}

    ngOnInit(): void {}

    cancelar() {
        // this.setearForm();
        this.modal = false;
    }
    abrirmodal() {
        this.modal = true;
    }

    cerrar() {;
      this.modal = false;
  }
}
