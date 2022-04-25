import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PurificadorasComponent } from './mantenimientos/purificadoras/purificadoras.component';
import { PipesModule } from '../pipes/pipes.module';
import { EmpleadoComponent } from './mantenimientos/empleados/empleado.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EmpleadosComponent,
    PagesComponent,
    PerfilComponent,
    PurificadorasComponent,
    UsuariosComponent,
    EmpleadoComponent,
    BusquedaComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    EmpleadosComponent,
    PagesComponent,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
