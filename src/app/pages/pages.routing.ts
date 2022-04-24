import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PurificadorasComponent } from './mantenimientos/purificadoras/purificadoras.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { EmpleadoComponent } from './mantenimientos/empleados/empleado.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'perfil', component: PerfilComponent },

      { path: 'usuarios', component:UsuariosComponent },
      { path: 'purificadoras', component: PurificadorasComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'empleado/:id', component: EmpleadoComponent }
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
