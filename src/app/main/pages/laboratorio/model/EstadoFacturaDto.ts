export class EstadoFacturaDto {
    idEstadoComprobante: number;
    nombreEstadoComp: string;
    detalleEstadoComp: string;
    estado:boolean;
    constructor(data: EstadoFacturaDto) {
        this.idEstadoComprobante = data.idEstadoComprobante,
        this.nombreEstadoComp = data.nombreEstadoComp,
        this.detalleEstadoComp = data.detalleEstadoComp;
    }
}
