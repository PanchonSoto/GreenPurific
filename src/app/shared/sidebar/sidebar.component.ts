import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    .menu { z-index:2!important;}
  `
  ]
})
export class SidebarComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {
    const  boton = document.getElementById('sidebarToggle');
    const navBar = document.getElementsByClassName('navbar-nav');

    const botonTop = document.querySelector('#sidebarToggleTop');

    boton?.addEventListener('click', e => {
      navBar[0].classList.toggle('toggled');
    });

    botonTop?.addEventListener('click', e => {
      navBar[0].classList.toggle('toggled');
    });
  }

}
