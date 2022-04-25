import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadoComponent } from './mantenimientos/empleados/empleado.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PurificadorasComponent } from './mantenimientos/purificadoras/purificadoras.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'buscar/:termino', component: BusquedaComponent },
      { path: 'perfil', component: PerfilComponent },

      { path: 'empleado/:id', component: EmpleadoComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'purificadoras', component: PurificadorasComponent },

      //ruta de admin
      { path: 'usuarios', canActivate: [AdminGuard] ,component:UsuariosComponent },
    ],
  },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
