import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interface';



const base_url=environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }



  googleInit() {
    return new Promise<void>(resolve=>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '540811714371-i9kl7mth68uo1h8vjufo7teggfp4ohdj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }


  logout(){
    localStorage.removeItem('token');
   
    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
    });
  }


  validartoken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res:any)=>{
        if(!token || token=== undefined) localStorage.setItem('token',res.token);
      }),
      map(res=>true),
      catchError(error=> of(false))
    );
  }


  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`,formData)
      .pipe(
        tap((res: any)=>{
          localStorage.setItem('token',res.token);
        })
      );
  }


  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`,formData)
      .pipe(
        tap((res: any)=>{
          localStorage.setItem('token',res.token)
        })
      );
  }


  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`,{token})
      .pipe(
        tap((res: any)=>{
          localStorage.setItem('token',res.token)
        })
      );
  }
}