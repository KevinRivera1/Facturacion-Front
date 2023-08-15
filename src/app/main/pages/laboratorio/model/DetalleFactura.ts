export interface DetalleFacturaModel {
        listado: DetalleFactura[]
}

export interface DetalleFactura{
    costoDf: number
    costotDf: number
    estadoServ:	string
    idConcepto: number
    idDetalleFactura: number
    idFacturaDTO: number
    idIva: number
    idMetodo: number
    idServicio:	number
    nombreServ:	string
    unidadesDf: number
    valorIva: number
}