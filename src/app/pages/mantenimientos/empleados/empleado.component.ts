import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Purificadora } from '../../../models/purificadora.model';
import { Empleado } from '../../../models/empleado.model';

import { PurificadoraService } from '../../../services/purificadora.service';
import { EmpleadosService } from '../../../services/empleados.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  public empleadoForm!: FormGroup;
  public purificadoras: Purificadora[]=[];

  public purificadoraSelected!: Purificadora; 
  public empleadoSelected!: Empleado;

  constructor(private fb: FormBuilder, 
              private purificService: PurificadoraService,
              private empleadoService: EmpleadosService,
              private router: Router,
              private activadRoute: ActivatedRoute,
              private userService: UsuariosService) { }

  ngOnInit(): void {

    this.activadRoute.params.subscribe(({id}) => {
      this.cargarEmpleado(id);
    });

    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      purificadora: ['',Validators.required]
    });

    this.cargarPurificadoras();

    this.empleadoForm.get('purificadora')?.valueChanges
      .subscribe(purificadoraId => {
        this.purificadoraSelected = this.purificadoras.find(p=> p.pid === purificadoraId)!;
      });
  }


  cargarEmpleado(id: string) {

  if(id === 'nuevo') return;

    this.empleadoService.getEmpleadosById(id)
      .pipe(delay(100))
      .subscribe(empleado => {
        if(!empleado) {
          this.router.navigateByUrl(`/dashboard/empleados`);
        } else { 
          const { nombre, purificadora } = empleado;
        this.empleadoSelected = empleado;
        this.empleadoForm.setValue({ nombre, purificadora: purificadora?._id})
        }
      });
  }
  
  
  cargarPurificadoras() {
    this.purificService.getPurificadoras()
      .subscribe((purificadoras: Purificadora[])=>{
        this.purificadoras = purificadoras;
      });
  }


  guardarEmpleado() {
    if(this.userService.role!=='ADMIN_ROLE') {
      Swal.fire('Error','No cuentas con los permisos necesarios','error');
    } else {
      if(this.empleadoSelected) {
        const data = {
          ...this.empleadoForm.value,
          eid: this.empleadoSelected.eid
        }
  
        this.empleadoService.actualizarEmpleado(data)
          .subscribe(res => {
            Swal.fire('Actualizado',`${this.empleadoForm.get('nombre')!.value} se ha actualizado`,'success');
          })
      } else {
        this.empleadoService.crearEmpleado(this.empleadoForm.value)
        .subscribe((res: any) => {
          Swal.fire('Creado',`${this.empleadoForm.get('nombre')!.value} se ha creado`,'success');
          this.router.navigateByUrl(`/dashboard/empleado/${res.empleado.eid}`);
        });
      }
    }
      
  }

  

}
