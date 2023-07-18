export class CentroCostoDto {
    idCentroCosto: number;
    codCentroCosto: string;
    nombreCentroCosto: string;
    descCentroCosto: string;
    estadoCentroCosto: string;
    fechaCentroCosto:Date;
    idUsuarioCentroCosto: number;

    // estado:boolean;

    fechaTxt: string

    // // formatDate?: string;

    constructor(data: CentroCostoDto) {
        this.idCentroCosto = data.idCentroCosto;
        this.codCentroCosto = data.codCentroCosto;
        this.nombreCentroCosto = data.nombreCentroCosto;
        this.descCentroCosto = data.descCentroCosto;
        this.estadoCentroCosto = data.estadoCentroCosto;
        this.fechaCentroCosto = data.fechaCentroCosto;
        this.idUsuarioCentroCosto = data.idUsuarioCentroCosto;
    }
}