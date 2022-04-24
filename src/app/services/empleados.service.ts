import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado.model';
import { map, Observable } from 'rxjs';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  get token(): string{
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  constructor(private http: HttpClient,) { }

  getEmpleados(): Observable<Empleado[]> {
    const url = `${base_url}/empleados`;
    return this.http.get<{ok: boolean, empleados: Empleado[]}>(url, this.headers)
      .pipe(
        map((res:{ok: boolean, empleados: Empleado[]}) => res.empleados)
      );
       
  }

  getEmpleadosById(id: string): Observable<Empleado> {
    const url = `${base_url}/empleados/${id}`;
    console.log(url);
    return this.http.get<{ok: boolean, empleado: Empleado}>(url, this.headers)
      .pipe(
        map((res:{ok: boolean, empleado: Empleado}) => res.empleado)
      );
       
  }

  crearEmpleado(empleado: { nombre: string, purificadora: string}) {
    const url = `${base_url}/empleados`;
    return this.http.post(url, empleado, this.headers); 
  }

  actualizarEmpleado(data: Empleado) {
    const url = `${base_url}/empleados/${data.eid}`;
    return this.http.put(url, data, this.headers); 
  }

  borrarEmpleado(data: Empleado) {
    const url = `${base_url}/empleados/${data.eid}`;
    return this.http.delete(url, this.headers); 
  }
  



}
