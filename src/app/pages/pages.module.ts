import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EmpleadosComponent,
    PagesComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    PagesRoutingModule,
    DashboardComponent,
    EmpleadosComponent,
    PagesComponent
  ]
})
export class PagesModule { }
