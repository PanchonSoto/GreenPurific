import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [`
    .text-center{
      height: 100vh;
    }
    .content{
      padding-top:150px;
    }
  `
  ]
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
