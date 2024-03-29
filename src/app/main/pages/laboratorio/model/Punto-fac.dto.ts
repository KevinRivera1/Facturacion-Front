export class PuntoDto {
  idPuntoFacturacion: number;
  secuencialPuntoFact: string;
  ncedUsuario: string;
  nombrePuntoFact: string;
  fechaCreacionPuntoFact: Date;
  idUsuarioPuntoFact: number;
  estadoPuntoFact: string;
  idUsuarioRel:number;

  
  estado:boolean;

  fechaTxt: string

  constructor(data: PuntoDto) {
      this.idPuntoFacturacion= data.idPuntoFacturacion;
      this.secuencialPuntoFact = data.secuencialPuntoFact;
      this.ncedUsuario = data.ncedUsuario;
      this.nombrePuntoFact = data.nombrePuntoFact
      this.fechaCreacionPuntoFact = data.fechaCreacionPuntoFact
      this.idUsuarioPuntoFact = data.idUsuarioPuntoFact
      this.idUsuarioRel = data.idUsuarioRel
  }
}




