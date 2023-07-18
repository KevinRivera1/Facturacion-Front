export interface TipoConceptoModel {
    listado: TipoConcepto[];
  }

  /*
  "idTipoConcepto": 2,
      "nombreTipoConcepto": "string",
      "descTipoConcepto": "string",
      "idUnidadTc": 0,
      "prtidaNc": 0,
      "fechaTc": 1689264671079,
      "idUsuarioTc": 0
  
*/ 

export interface TipoConcepto {
    descTipoConcepto: string;
    fechaTc: string;
    idTipoConcepto: number;
    idUnidadTc: number;
    idUsuarioTc: number;
    nombreTipoConcepto: string;
    prtidaNc: number;
    //estadoTc: string;
}

