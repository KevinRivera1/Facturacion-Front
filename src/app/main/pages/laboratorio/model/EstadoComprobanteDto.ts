export class EstadoComprobanteDto {
    idEstadoComprobante: number;
    nombreEstadoComp: string;
    detalleEstadoComp: string;
    estadoCompr:string;
    idUsuarioEstComprob:number;
    estado:boolean;
    constructor(data: EstadoComprobanteDto) {
        this.idEstadoComprobante = data.idEstadoComprobante,
        this.nombreEstadoComp = data.nombreEstadoComp,
        this.detalleEstadoComp = data.detalleEstadoComp,
        this.idUsuarioEstComprob = data.idUsuarioEstComprob,
        this.estadoCompr = data.estadoCompr
    }
}
