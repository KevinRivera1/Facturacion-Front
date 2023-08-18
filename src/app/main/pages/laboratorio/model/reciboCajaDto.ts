export class ReciboCajaDto {
    idReciboCaja:           number;
    codRcaja:               string;
    fechaRcaja:             Date;
    idTipoConsumidorRc:     number;
    idCajaRc:               number;
    idEstadoRc:             number;
    subtotalRc:             number;
    ivaRc:                  number;
    totalRc:                number;
    nroPagosRc:             number;
    rucConsumidorRc:        string;
    nombreConsumidorRc:     string;
    direccionConsumidorRc:  string;
    telfConsumidorRc:       string;
    correoConsumidorRc:     string;
    carreraConsumidorRc:    string;
    observacionRc:          string;
    idUsuarioRc:            number;

    constructor(data: ReciboCajaDto) {
        this.idReciboCaja = data.idReciboCaja;
        this.codRcaja = data.codRcaja;
        this.fechaRcaja = data.fechaRcaja;
        this.idTipoConsumidorRc = data.idTipoConsumidorRc;
        this.idCajaRc = data.idCajaRc;
        this.idEstadoRc = data.idEstadoRc;
        this.subtotalRc = data.subtotalRc;
        this.ivaRc = data.ivaRc;
        this.totalRc = data.totalRc;
        this.nroPagosRc = data.nroPagosRc;
        this.rucConsumidorRc = data.rucConsumidorRc;
        this.nombreConsumidorRc = data.nombreConsumidorRc;
        this.direccionConsumidorRc = data.direccionConsumidorRc;
        this.telfConsumidorRc = data.telfConsumidorRc;
        this.correoConsumidorRc = data.correoConsumidorRc;
        this.carreraConsumidorRc = data.carreraConsumidorRc;
        this.observacionRc = data.observacionRc;
        this.idUsuarioRc = data.idUsuarioRc;
    }
}
