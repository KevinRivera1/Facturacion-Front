export interface ReciboCaja {
    codigoRespuestaName:  string;
    codigoRespuestaValue: number;
    mensaje:              string;
    objeto:               null;
    listado:              Listado[];
    totalRegistros:       number;
}

export interface Listado {
    idCaja:                    number;
    descripcionCaja:           string;
    secuenciaFactura:          number;
    secuenciaRcvcaja:          number;
    secuenciaNotac:            number;
    secuencialLiquidCompras:   number;
    secuencialComprobantesRet: number;
    idPuntoFacturacionDto:     IDPuntoFacturacionDto;
}

export interface IDPuntoFacturacionDto {
    idPuntoFacturacion:     number;
    secuencialPuntoFact:    string;
    idUsuarioRel:           number;
    nombrePuntoFact:        string;
    fechaCreacionPuntoFact: null;
    idUsuarioPuntoFact:     number;
    estadoPuntoFact:        string;
}
