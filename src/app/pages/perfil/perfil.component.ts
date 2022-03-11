import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {


  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any;

  constructor(private fb: FormBuilder, private uService: UsuariosService, private fService: FileUploadService) {
    this.usuario = uService.usuario!;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email] ]
    });
  }



  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.uService.actualizarPerfil(this.perfilForm.value)
      .subscribe(res =>{
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
      },err=> Swal.fire('Error', err.error.msg, 'error') );
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
    this.fService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen del usuario actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      });
  }

}
