interface _PurificadoraUser {
    _id: string;
    nombre: string;
    img: string;
  }
  
export class Purificadora { 
      constructor(
          public nombre: string,
          public localidad: string,
          public estado: string,
          public pid?: string,
          public img?: string,
          public usuario?: _PurificadoraUser
      ) {} 
}