export interface ReciboCaja{
    listado:              Listado[];
}

export interface Listado {
    idReciboCaja:          number;
    codRcaja:              string;
    fechaRcaja:            number;
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