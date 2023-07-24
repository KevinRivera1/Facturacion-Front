export class TipoConceptoDto {
  idTipoConcepto: number;
  nombreTipoConcepto: string;
  descTipoConcepto: string;
  
    
  idUnidadTc: number;
  idUsuarioTc: number;
  fechaTc: Date;
  partida: number;
  estadoTC: string;
  

   

    fechaTxt: string
    
    constructor(data: TipoConceptoDto) {
      this.descTipoConcepto = data.descTipoConcepto;
      this.fechaTc = data.fechaTc;
      this.idTipoConcepto = data.idTipoConcepto;
      this.idUnidadTc = data.idUnidadTc;
      this.idUsuarioTc = data.idUsuarioTc;
      this.nombreTipoConcepto = data.nombreTipoConcepto;
      this.partida = data.partida;
      this.estadoTC = data.estadoTC;
    }
  }
  