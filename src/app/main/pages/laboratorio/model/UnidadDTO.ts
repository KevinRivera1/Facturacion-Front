export class UnidadDto {
    idUnidadTc: number;
    nombreU: string;

    constructor(data: UnidadDto) {
        this.idUnidadTc = data.idUnidadTc;
        this.nombreU = data.nombreU;
    }
}
