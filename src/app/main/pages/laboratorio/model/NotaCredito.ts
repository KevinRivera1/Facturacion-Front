export interface NotaCreditoModel {
    listado: NotaCredito[];
  }


export interface NotaCredito {
    idNotaCredito: number;
    codNc: string;
    idFactura: number;
    fechaNc: number | null;
    idEstadoNc: number;
    motivoNc: string;
    idUsuarioNc: number;
}

