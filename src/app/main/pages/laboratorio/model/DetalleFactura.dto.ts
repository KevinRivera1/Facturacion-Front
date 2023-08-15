export class DetalleFacturaDto {
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

constructor(data: DetalleFacturaDto) {
    this.costoDf = data.costoDf;
    this.costotDf = data.costotDf;
    this.estadoServ = data.estadoServ;
    this.idConcepto = data.idConcepto
    this.idDetalleFactura = data.idDetalleFactura
    this.idFacturaDTO = data.idFacturaDTO
    this.idIva = data.idIva;
    this.idMetodo = data.idMetodo;
    this.idServicio = data.idServicio;
    this.nombreServ = data.nombreServ
    this.unidadesDf = data.unidadesDf
    this.valorIva = data.valorIva
}
}