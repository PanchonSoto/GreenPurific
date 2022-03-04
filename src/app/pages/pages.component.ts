import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private usuarioS: UsuariosService) { }

  ngOnInit(): void {
  }


  logout(){
    this.usuarioS.logout();
  }

}
