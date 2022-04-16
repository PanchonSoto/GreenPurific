import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';


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

  buscar(tipo: 'usuarios'|'medicos'|'hospitales', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return  this.http.get<any[]>(url, this.headers)
              .pipe(
                map((res:any) => {
                switch (tipo) {
                  case 'usuarios':
                    return this.transformarUsers(res.resultados)
                    
                
                  default:
                    return [];
                }
                })
              );
              
  }
}
