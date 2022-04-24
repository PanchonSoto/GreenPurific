import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purificadora } from '../models/purificadora.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PurificadoraService {

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

  getPurificadoras(): Observable<Purificadora[]> {
    const url = `${base_url}/purificadoras`;
    return this.http.get<{ok: boolean, purificadora: Purificadora[]}>(url, this.headers)
      .pipe(
        map((res:{ok: boolean, purificadora: Purificadora[]}) => res.purificadora)
      );
       
  }

  crearPurificadora(data: Purificadora) {
    const url = `${base_url}/purificadoras`;
    return this.http.post(url, data, this.headers); 
  }

  actualizarPurificadora(data: Purificadora) {
    const url = `${base_url}/purificadoras/${data.pid}`;
    return this.http.put(url, data, this.headers); 
  }

  borrarPurificadora(data: Purificadora) {
    const url = `${base_url}/purificadoras/${data.pid}`;
    return this.http.delete(url, this.headers); 
  }

}
