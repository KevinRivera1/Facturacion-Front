export interface EstadoComprobanteModel {
    listado: EstadoComprobante [];
}

export interface EstadoComprobante {
    idEstadoComprobante: number;
    nombreEstadoComp: string;
    detalleEstadoComp: string;
    idUsuarioEstComprob: number;
    estadoCompr:string;
}
