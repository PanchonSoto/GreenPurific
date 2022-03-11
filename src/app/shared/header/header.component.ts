import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    .perfil {
      object-fit: cover;
    }
  `
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(private usuarioS: UsuariosService) {
    this.usuario = usuarioS.usuario!;
  }

  ngOnInit(): void {
  }


  logout(){
    this.usuarioS.logout();
  }

}
