export class IvaDto{

    idIva: number;
    nombreIva: string;
    
    constructor(data: IvaDto) {
        this.idIva = data.idIva;
        this.nombreIva = data.nombreIva;
       
    }

}
