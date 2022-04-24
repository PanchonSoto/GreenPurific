import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalPurificadoraComponent } from './modal-purificadora/modal-purificadora.component';






@NgModule({
  declarations: [
    ModalImagenComponent, 
    ModalPurificadoraComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ModalImagenComponent,
    ModalPurificadoraComponent
  ]
})
export class ComponentsModule { }
