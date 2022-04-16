import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios!: Usuario[];
  public usuariosTemp!: Usuario[];
  public desde: number = 0;
  public cargando: boolean = false;
  public imgSub?: Subscription;

  constructor(private userService: UsuariosService, private searchService: BusquedasService, public modalService: ModalImagenService) { }
  
  ngOnDestroy(): void {
    this.imgSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSub = this.modalService.nuevaImagen
    .pipe(delay(100))
    .subscribe((_)=>this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.userService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios}) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
      });
  
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if(this.desde < 0) {
      this.desde = 0;

    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor; 

    } else {
  
      this.cargarUsuarios();
    }
    
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      this.usuarios = this.usuariosTemp;
    }

    this.searchService.buscar('usuarios', termino)
      .subscribe(res => {
        this.usuarios = res;
      });
  }

  eliminarUser(usuario: Usuario) {
    Swal.fire({
      title: 'Eliminar usuario?',
      text: `Eliminar a "${usuario.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUsuario(usuario)
          .subscribe((_) => {
            Swal.fire('Usuario eliminado',`${usuario.nombre} fue eliminado`,'success');
            this.cargarUsuarios();
          });
      }
    })
  }

  eliminarme(user: Usuario){
    const id = this.userService.uid;
    return (user.uid === id) ? false : true;
  }

  cambiarRole(usuario :Usuario) {
    this.userService.guardarUsuario(usuario)
      .subscribe(res => {
        console.log(res);
      });
  }

  abrirModal(usuario : Usuario) {
    this.modalService.abrirModal('usuarios',usuario.uid!, usuario.img);
  }

}
