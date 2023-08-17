import { ConceptoDto } from "./ConceptoDto"
import { FacturaDto } from "./Factura.dto"

export interface DetalleFacturaModel {
        listado: DetalleFactura[]
}

export interface DetalleFactura{
    costoDf: number;
    costotDf: number;
    estadoServ:	string;
    idConcepto: ConceptoDto | null;
    idDetalleFactura: number;
    idFacturaDTO: FacturaDto | null;
    idIva: number;
    idMetodo: number;
    idServicio:	number;
    nombreServ:	string;
    unidadesDf: number;
    valorIva: number
}