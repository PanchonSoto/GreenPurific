import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    img{
      margin-top: 20px;
      width: 100%;
    }
  `
  ]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
