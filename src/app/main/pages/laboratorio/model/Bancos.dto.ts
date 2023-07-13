export class BancoDto {
    idBancos: number;
    nombreBancos: string;
    descBancos: string;
    estadoBancos: string;
    fechaBancos: Date;
    idUsuarioBancos: number;

    estado:boolean;

    fechaTxt: string

    // formatDate?: string;

    constructor(data: BancoDto) {
        this.idBancos = data.idBancos;
        this.nombreBancos = data.nombreBancos;
        this.descBancos = data.descBancos;
        this.estadoBancos = data.estadoBancos
        this.fechaBancos = data.fechaBancos
        this.idUsuarioBancos = data.idUsuarioBancos
    }
}
