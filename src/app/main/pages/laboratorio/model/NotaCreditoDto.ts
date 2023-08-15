export class NotaCreditoDto {
    idNotaCredito: number;
    codNc: string;
    idFactura: number;
    fechaNc: Date;
    idEstadoNc: number;
    motivoNc: string;
    idUsuarioNc: number;

    //estado:boolean;

    fechaTxt: string

    constructor(data: NotaCreditoDto) {
        this.idNotaCredito = data.idNotaCredito;
        this.codNc = data.codNc;
        this.idFactura = data.idFactura;
        this.fechaNc = data.fechaNc;
        this.idEstadoNc = data.idEstadoNc;
        this.motivoNc = data.motivoNc;
        this.idUsuarioNc = data.idUsuarioNc
    }
}
