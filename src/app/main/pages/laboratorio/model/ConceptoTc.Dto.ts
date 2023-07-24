export class ConceptoTcDto {
    idTipoConcepto: number;
    nombreTipoConcepto: string;

    constructor(data: ConceptoTcDto) {
        this.idTipoConcepto = data.idTipoConcepto;
        this.nombreTipoConcepto = data.nombreTipoConcepto;
    }
}
