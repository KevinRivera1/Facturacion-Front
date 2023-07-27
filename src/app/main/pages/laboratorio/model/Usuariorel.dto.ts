export class UsuarioRelDto {
  idUsuario: number;
  nombres: string
 
  

  constructor(data: UsuarioRelDto) {
      this.idUsuario= data.idUsuario;
      this.nombres = data.nombres;
      
  }
}




