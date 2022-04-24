import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import { Empleado } from '../../../models/empleado.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit, OnDestroy {

  public imgSub!: Subscription;
  public cargando: boolean = true;
  public empleados: Empleado[] = [];
  constructor(private empleadoService: EmpleadosService, 
              private modalImg: ModalImagenService,
              private busquedaS: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarEmpleados();
    this.imgSub = this.modalImg.nuevaImagen
      .pipe(delay(100))
      .subscribe((_) => {
        this.cargarEmpleados();
      });  
  }

  cargarEmpleados() {
    this.empleadoService.getEmpleados()
      .subscribe(res =>{ 
        this.cargando = false;
        this.empleados = res;
      });
  }

  abrirModal(empleado: Empleado) {
    this.modalImg.abrirModal('empleados',empleado.eid!, empleado.img);
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarEmpleados();
    }

    this.busquedaS.buscarEmpleado(termino)
      .subscribe(res =>{
        this.empleados = res;
      });
  }

  borrarEmpleado(empleado: Empleado) {
    Swal.fire({
      title: 'Eliminar empleado',
      text: `Borrar purificadora "${empleado.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.borrarEmpleado(empleado)
        .subscribe(res => {
          Swal.fire(
            'Eliminado',
            `El empleado "${empleado.nombre}" se ha eliminado`,
            'success'
          );
         this.cargarEmpleados();  
        }); 
      }
    });
  }
}
