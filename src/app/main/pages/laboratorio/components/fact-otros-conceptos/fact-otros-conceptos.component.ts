import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BreadcrumbService } from 'src/app/_service/utils/app.breadcrumb.service';
import { FormaPagoService } from '../../services/formaPago.service';
import { ConceptoService } from '../../services/concepto.service';
import { ConceptoDto } from '../../model/ConceptoDto';
import { Table } from 'primeng/table';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-fact-otros-conceptos',
  templateUrl: './fact-otros-conceptos.component.html',
  styleUrls: ['./fact-otros-conceptos.component.css']
})
export class FactOtrosConceptosComponent implements OnInit {
  modal: boolean;
  cedula: string;
  modal2: boolean;
  modal3: boolean;
  modal1: boolean; //Visibilidad de un modal
  busquedaForm: FormGroup;

  maxLengthR: number = 13;
  maxLengthC: number = 10;
  modallista: boolean;

  displayModal: boolean = false;

  selectedOption: string = '';

  data: string = '';

  /*variables para listar conceptos*/
  loading: boolean;
  @Input() listConceptos: ConceptoDto[];
  conceptos: ConceptoDto;
  /*variable para llamar conceptos*/
  selectedRecord: any;
  idConcepto: string = '';
  nombreConcepto: string = '';
  valorConcepto: number = 0;
  


  constructor(
    private breadcrumbService: BreadcrumbService,
    private conceptosService: ConceptoService,
  
  ) {
    
    {
      this.breadcrumbService.setItems([{ label: 'Factura Otros Conceptos ' }]);
      
    }
  }
   
  onInput(event: any) {
    
    const input = event.target;
    const value = input.value;

    // Remover caracteres no numéricos excepto el símbolo "-"
    const numericValue = value.replace(/[^\d-]/g, '');
    input.value = numericValue;
  }

  

  ngOnInit(): void {
    this.llenarListConceptos();
  }

  cerrar() {

    this.modal = false;
    this.modal2 = false;
    this.modal3 = false;

    this.modallista = false;
  }

  cerrar1() {
    this.modal1 = false;
    this.modal2 = false;
    this.modal3 = false;

    this.modallista = false;
  }

  abrirmodal() {
    this.modal = true;
  }
  abrirmodal1() {
    this.modal1 = true;
  }
  // abrirmodal2() {
  //   this.modal2 = true;
  // }
  abrirmodal3() {
    this.modal3 = true;
  }
  //Cerrar el modal y restablecer el formulario

  abrirmodalista() {
    this.modallista = true;
  }

  modalOpen() {
    //this.displayAnulacioModal.onDisplayForm()
    this.displayModal = true;
    console.log('abrir modal desde tabla');
}

closeModal() {
    this.displayModal = false;
    console.log('cerrando modal');
}

buscarU(): void {
  switch (this.selectedOption) {
    case "Estudiante":
      this.data = "Estudiante";
      break;
    case "0":
      this.data = "Cliente";
      break;
    case "1":
      this.data = "Empleado";
      break;
    default:
      this.data = ""; // Valor por defecto si ninguna opción está seleccionada
      break;
  }
  this.modal2 = true;
  console.log(this.data);
}

clear(table: Table) {
  table.clear();
}

loadData(event) {
  this.loading = true;
  setTimeout(() => {
      this.conceptosService.getAll().subscribe((res) => {
          this.listConceptos = res;
          console.log('LLAMADA');
          console.log(this.listConceptos);
          this.loading = false;
      });
  }, 1000);
}

async llenarListConceptos() {
  await this.conceptosService.getAll().subscribe({
      next: (data) => {
          this.listConceptos = data.listado;
          console.log('CORRECTO');
          console.log(this.listConceptos);
      },
  });
}

showAttributes(record: any) {
  this.selectedRecord = record;

  // Actualiza las variables con los valores del registro seleccionado
  this.idConcepto = this.selectedRecord.codigoConcepto;
  this.nombreConcepto = this.selectedRecord.nombreConcepto;
  this.valorConcepto = this.selectedRecord.valorConcepto;
}

}
