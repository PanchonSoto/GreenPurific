import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { Purificadora } from '../models/purificadora.model';
import { Empleado } from '../models/empleado.model';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  public auth2: any;
  public usuario?: Usuario;

  get token() {
    return localStorage.getItem('token') || ''; 
  }

  get headers() {
    return { 
      headers: {
        'x-token': this.token
      }
    };
  }

  constructor(private http: HttpClient) { }


  private transformarUsers(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
    );
  }

  private transformarPurificadoras(resultados: any[]): Purificadora[] {
    return resultados.map(
      purific => new Purificadora(purific.nombre,purific.localidad,purific.estado,purific.pid, purific.img)
    );
  }

  private transformarEmpleados(resultados: any[]): Empleado[] {
    return resultados.map(
      empleado => new Empleado(empleado.nombre,empleado.eid,empleado.img,empleado.usuario,empleado.purificadora)
    );
  }


  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return  this.http.get(url, this.headers);
  }


  buscarUser(termino: string) {
    const url = `${base_url}/todo/coleccion/usuarios/${termino}`;
    return  this.http.get<any[]>(url, this.headers)
              .pipe(
                map((res:any) => {
                    return this.transformarUsers(res.resultados);
                })
              );
              
  }

  buscarPurificadora(termino: string) {
    const url = `${base_url}/todo/coleccion/purificadoras/${termino}`;
    return  this.http.get<any[]>(url, this.headers)
              .pipe(
                map((res:any) => {
                    return this.transformarPurificadoras(res.resultados);
                })
              );         
  }

  buscarEmpleado(termino: string) {
    const url = `${base_url}/todo/coleccion/empleados/${termino}`;
    return  this.http.get<any[]>(url, this.headers)
              .pipe(
                map((res:any) => {
                    return this.transformarEmpleados(res.resultados);
                })
              );  
  }
}
