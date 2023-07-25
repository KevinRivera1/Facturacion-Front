export class ConceptoDto{

    idConcepto: number;
    nombreConcepto: string;
    codigoConcepto: string;
    idTipoConceptoDto: {idTipoConcepto: number;};
    idIva: number;
    descConcepto: string;
    valorConcepto: number;
    estadoConcetpto: string;
    fechaConcepto:Date;
    idUsuarioConcepto: number;

    estado:boolean;

    fechaTxt: string

    
    constructor(data: ConceptoDto) {
        this.idConcepto = data.idConcepto;
        this.codigoConcepto = data.codigoConcepto;
        this.idTipoConceptoDto = data.idTipoConceptoDto;
        this.idIva = data.idIva;
        this.nombreConcepto = data.nombreConcepto;
        this.descConcepto = data.descConcepto;
        this.valorConcepto = data.valorConcepto;
        this.estadoConcetpto = data.estadoConcetpto;
        this.fechaConcepto = data.fechaConcepto;
        this.idUsuarioConcepto = data.idUsuarioConcepto;
    }

}
