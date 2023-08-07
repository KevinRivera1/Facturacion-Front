import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proformas-table',
  templateUrl: './proformas-table.component.html',
  styleUrls: ['./proformas-table.component.css']
})
export class ProformasTableComponent implements OnInit {
  modal: boolean;

  constructor() { }

  ngOnInit() {
  }

  abrirmodal() {
    this.modal = true;
}
cerrar() {

  this.modal = false;
  

}
}
