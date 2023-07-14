export interface FormaPagoModel {
    listado: FormaPago[];
  }
  export interface FormaPago {
    idFormaPago: number;
    nombreFp: string;
    descripcionFp: string;
    activo: string;
    fechaFp: string;
    codigoSae: string;
    codigoSri: string;
    idUsuarioFp: number;
    estado:boolean;
}