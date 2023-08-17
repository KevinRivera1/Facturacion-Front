export class  TarjetaDto {
    dateTarjeta:	string;
    descTarjeta:	string;
    idTarjeta:	    number;
    idUsurTarjeta:	number;
    nombreTarjeta:	string;
    stateTarjeta:	string;

    
    constructor(data: TarjetaDto) {
        this.dateTarjeta = data.dateTarjeta;
        this.descTarjeta = data.descTarjeta;
        this.idTarjeta = data.idTarjeta;
        this.idUsurTarjeta = data.idUsurTarjeta;
        this.nombreTarjeta = data.nombreTarjeta;
        this.stateTarjeta = data.stateTarjeta;
    }
}
