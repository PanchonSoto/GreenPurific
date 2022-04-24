import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
    img{
      margin-top: 10%;
    }
  `
  ]
})
export class RegisterComponent implements OnInit {


  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Pancho', [Validators.required]],
    email: ['test100@gmail.com', [Validators.required,Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true, Validators.requiredTrue]
  },
  {
    validators: this.passwordsIguales('password','password2')
  });

  constructor(private fb: FormBuilder, private usuarioS: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }



  crearUsuario() {
    this.formSubmitted = true;

    if(this.registerForm.invalid) {
      return
    } 

    this.usuarioS.crearUsuario(this.registerForm.value)
      .subscribe((_)=>{
        //navegar dashboard
        this.router.navigateByUrl('/');
      }, (err)=> Swal.fire('Error', err.error.msg, 'error'));
  }
  
  campoNoValido(campo: string): boolean {
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')!.value && this.formSubmitted;
  }

  passwordValid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    const form = this.formSubmitted;

    let res = (pass1!==pass2 && form) ? true : false;
    
    return res;
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      (pass1Control?.value===pass2Control?.value) 
        ? pass2Control?.setErrors(null)
        : pass2Control?.setErrors({noEsIgual: true})  
    }
  }
}
