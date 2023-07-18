export class FormaPagoDto {
    idFormaPago: number;
    nombreFp: string;
    descripcionFp: string;
    activo: string;
    fechaFp: Date;
    codigoSae: string;
    codigoSri: string;
    idUsuarioFp: number;

    estado:boolean;

    fechaTxt: string

    formatDate?: string;

  /*   constructor(data: FormaPagoDto) {
        this.idFormaPago = data.idFormaPago;
        this.nombreFp = data.nombreFp;
        this.descripcionFp = data.descripcionFp;
        this.activo = data.activo;
        this.fechaFp = data.fechaFp;
        this.codigoSae = data.codigoSae;
        this.codigoSri = data.codigoSri;
        this.idUsuarioFp = data.idUsuarioFp;

    } */
}
