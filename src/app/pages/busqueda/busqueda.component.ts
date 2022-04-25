import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Empleado } from '../../models/empleado.model';
import { Purificadora } from '../../models/purificadora.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {


  public empleados: Empleado[] = [];
  public purificadoras: Purificadora[] = [];
  public usuarios: Usuario[] = [];

  constructor(private actRoute: ActivatedRoute, private searchService: BusquedasService) { }

  ngOnInit(): void {
    this.actRoute.params
      .subscribe(({termino}) => {
        this.busquedaGlobal(termino);
      }); 
  }


  busquedaGlobal(termino: string) {
    this.searchService.busquedaGlobal(termino)
      .subscribe((res:any) => {
        this.empleados = res.empleado;
        this.purificadoras = res.purificadora;
        this.usuarios = res.usuarios;
      });
  }

}
