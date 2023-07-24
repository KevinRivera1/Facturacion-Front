export interface ConceptoModel {
    listado: Conceptos[];
  }


export interface Conceptos {
  idConcepto: number;
  nombreConcepto: string;
  codigoConcepto: number;
  idTipoConcepto: number;
  idIva: number;
  descConcepto: string;
  valorConcepto: number;
  estadoConcetpto: string;
  fechaConcepto: string;
  idUsuarioConcepto: number;

}

