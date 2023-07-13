export interface BancosModel {
    listado: Bancos[];
  }


export interface Bancos {
    idBancos: number;
    nombreBancos: string;
    descBancos: string;
    estadoBancos: string;
    fechaBancos: string;
    idUsuarioBancos: number;
}

