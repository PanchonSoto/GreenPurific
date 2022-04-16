import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public imagenSubir!: File;
  public imgTemp: any;

  constructor(public modalService: ModalImagenService, private uService: UsuariosService, private fService: FileUploadService) { }

  ngOnInit(): void {
  }


  cerrarModal(): void {
    this.imgTemp = null;
    this.modalService.cerrarModal();
  }

  
  cambiarImagen(event:any) {
    let file = event.target?.files[0];
    this.imagenSubir = file;

    if(!file) {
      return this.imgTemp = null;
    } else { 
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
      return;
    }
    
  }

  subirImagen() {
    const id = this.modalService.id;
    const tipo = this.modalService.tipo;

    this.fService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen del usuario actualizada', 'success');
        this.cerrarModal();
        this.modalService.nuevaImagen.emit(img);
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
