import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioS: UsuariosService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {

      return this.usuarioS.validartoken()
        .pipe(
          tap(isAuth=> {
            if(!isAuth) this.router.navigateByUrl('/login');
          })
        );
  }
  
}
