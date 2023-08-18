export interface ReciboCaja{
    listado:              ReciboCajaModel[];
}

export interface ReciboCajaModel {
    idReciboCaja:          number;
    codRcaja:              string;
    fechaRcaja:            Date;
    idTipoConsumidorRc:    number;
    idCajaRc:              number;
    idEstadoRc:            number;
    subtotalRc:            number;
    ivaRc:                 number;
    totalRc:               number;
    nroPagosRc:            number;
    rucConsumidorRc:       string;
    nombreConsumidorRc:    string;
    direccionConsumidorRc: string;
    telfConsumidorRc:      string;
    correoConsumidorRc:    string;
    carreraConsumidorRc:   string;
    observacionRc:         string;
    idUsuarioRc:           number;
}