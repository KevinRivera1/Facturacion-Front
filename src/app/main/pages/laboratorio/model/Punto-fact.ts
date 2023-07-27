export interface PuntoModel {
  listado: Punto[];
}

export interface Punto {
  idPuntoFacturacion: number;
  secuencialPuntoFact: string;
  ncedUsuario: string;
  nombrePuntoFact: string;
  fechaCreacionPuntoFact: string;
  idUsuarioPuntoFact: number;
  estadoPuntoFact:string;
  idUsuarioRel:number;
}

