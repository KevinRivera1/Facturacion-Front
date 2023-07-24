export class EstadoComprobanteDto {
    idEstadoComprobante: number;
    nombreEstadoComp: string;
    detalleEstadoComp: string;
    estadoCompr:string;
    estado:boolean;
    constructor(data: EstadoComprobanteDto) {
        this.idEstadoComprobante = data.idEstadoComprobante,
        this.nombreEstadoComp = data.nombreEstadoComp,
        this.detalleEstadoComp = data.detalleEstadoComp,
        this.estadoCompr = data.estadoCompr
    }
}
