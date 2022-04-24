interface _EmpleadoUser {
    _id: string;
    nombre: string;
    img: string;
}

interface Purificadora {
    _id: string;
    nombre: string;
    img: string;
    estado: string;
    localidad: string;
}

  
export class Empleado { 
      constructor(
          public nombre: string,
          public eid?: string,
          public img?: string,
          public usuario?: _EmpleadoUser,
          public purificadora?: Purificadora
      ) {} 
}