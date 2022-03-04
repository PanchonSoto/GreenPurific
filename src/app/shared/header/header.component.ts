import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioS: UsuariosService) { }

  ngOnInit(): void {
  }


  logout(){
    this.usuarioS.logout();
  }

}
