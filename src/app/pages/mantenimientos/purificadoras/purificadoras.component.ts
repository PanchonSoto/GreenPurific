import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, delay } from 'rxjs';

import { Purificadora } from 'src/app/models/purificadora.model';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ModalPurificadoraService } from 'src/app/services/modal-purificadora.service';
import { PurificadoraService } from 'src/app/services/purificadora.service';

import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';


@Component({
  selector: 'app-purificadoras',
  templateUrl: './purificadoras.component.html',
  styleUrls: ['./purificadoras.component.css']
})
export class PurificadorasComponent implements OnInit, OnDestroy {

  @ViewChild('miForm') miFormulario!: NgForm;

  public purificSub!: Subscription;
  public imgSub!: Subscription;

  public purificadoras: Purificadora[] = [];
  public purificadoraTemp: Purificadora[] = [];
  
  public cargando = true;
  public purificadora?: Purificadora;

  constructor(
    private purificService: PurificadoraService, 
    public modalPurific: ModalPurificadoraService,
    private modalImage: ModalImagenService,
    private searchService: BusquedasService) { }
  

  ngOnInit(): void {
    this.cargarPurificadoras();
    //subscribiendome a los cambios cuando agregamos una purificadora
    this.purificSub = this.modalPurific.nuevaPurific
      .pipe(delay(100))
      .subscribe(img => {
        this.cargarPurificadoras();
        Swal.fire('Datos guardados','La purificadora ha sido actualizada','success');
      });
    
    // subscribiendome a los cambios cuando agregamos una imagen
    this.imgSub = this.modalImage.nuevaImagen
      .subscribe((_)=>{
        this.cargarPurificadoras();
      })
      
  }

  ngOnDestroy(): void {
    this.purificSub.unsubscribe();
    this.imgSub.unsubscribe();
  }





  cargarPurificadoras() {
    this.purificService.getPurificadoras()
      .subscribe(res => {
        this.purificadoras = res;
        this.cargando = false;
        this.purificadoraTemp = res;
      });
  }

  guardar(form: NgForm) {
    const nombre = this.miFormulario.value.nombre;
    const estado = this.miFormulario.value.estado;
    const localidad = this.miFormulario.value.localidad;

    this.purificadora = { nombre, estado, localidad }

    if(!form.valid) return;

    this.purificService.crearPurificadora(this.purificadora)
      .subscribe(res => {
        Swal.fire('Regitro exitoo','La purificadora ha sido registrada','success');
        this.cargarPurificadoras();
        this.miFormulario.reset();
      });
  }


  eliminarPurificadora(purific: Purificadora) {
    Swal.fire({
      title: 'Eliminar purificadora',
      text: `Borrar purificadora "${purific.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.purificService.borrarPurificadora(purific)
        .subscribe(res => {
          Swal.fire(
            'Eliminado',
            `La purificadora "${purific.nombre}" se ha eliminado`,
            'success'
          );
         this.cargarPurificadoras();  
        }); 
      }
    });    
  }

  abrirModal(purific: Purificadora) {
    this.modalImage.abrirModal('purificadoras',purific.pid!, purific.img);
  }

  buscar(termino: string) {
    if(termino.length=== 0) {
      this.purificadoras = this.purificadoraTemp; 
    }
    

    this.searchService.buscarPurificadora(termino)
    .subscribe(res => {
      this.purificadoras = res;
    });
  }
  

}
