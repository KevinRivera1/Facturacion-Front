export interface EstadoFacturaModel {
    listado: EstadoFactura [];
}

export interface EstadoFactura {
    idEstadoComprobante: number;
    nombreEstadoComp: string;
    detalleEstadoComp: string;
}
