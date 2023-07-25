import { TipoConceptoDto } from "./TipoConcepto.dto";

export interface Conceptos {
    listado: ConceptoModel[];
}

export interface ConceptoModel {
    idConcepto: number;
    codigoConcepto: string;
    idIva: number;
    nombreConcepto: string;
    descConcepto: string;
    valorConcepto: number;
    estadoConcetpto: string;
    fechaConcepto: number | null;
    idUsuarioConcepto: number;
    idTipoConceptoDto: TipoConceptoDto | null;
}

// export interface IDTipoConceptoDto {
//     idTipoConcepto: number;
//     nombreTipoConcepto: string;
//     // descTipoConcepto:   string;
//     // idUnidadTc:         number;
//     // partida:            number;
//     // fechaTc:            number;
//     // idUsuarioTc:        number;
//     // estadoTC:           string;
// }
