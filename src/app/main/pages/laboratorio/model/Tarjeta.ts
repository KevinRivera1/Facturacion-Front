export interface TarjetaModel {
    listado: Tarjeta[];
  }


export interface Tarjeta {
    dateTarjeta:	string;
    descTarjeta:	string;
    idTarjeta:	    number;
    idUsurTarjeta:	number;
    nombreTarjeta:	string;
    stateTarjeta:	string;
}
