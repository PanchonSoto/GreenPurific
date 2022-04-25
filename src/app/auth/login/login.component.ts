import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    img{
      margin-top: 20px;
      margin-left: 10%;
    }
  `
  ]
})
export class LoginComponent implements OnInit {



  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || 'cuentaAdmin@gmail.com', [Validators.required, Validators.email]],
    password: ['123456',Validators.required],
    remember: false
  });

  constructor(
    private fb: FormBuilder, 
    private usuarioS: UsuariosService, 
    private router: Router, 
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login(){
    this.usuarioS.login(this.loginForm.value)
      .subscribe(res=>{
        if(this.loginForm.get('remember')!.value){
          localStorage.setItem('email', this.loginForm.get('email')!.value);  
        } else {
          localStorage.removeItem('email');
        }
        //navegar dashboard
        this.router.navigateByUrl('/');
      }, err=> Swal.fire('Error',err.error.msg, 'error' ));
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }


  async startApp() {
    await this.usuarioS.googleInit();
    this.auth2 = this.usuarioS.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
    
  }
  
  
  attachSignin(element:any) {
  
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioS.loginGoogle(id_token)
            .subscribe(res=>{
              this.ngZone.run(()=>{
                
                this.router.navigateByUrl('/');//navegar al dash
              });
            });
        }, (error:any)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}


