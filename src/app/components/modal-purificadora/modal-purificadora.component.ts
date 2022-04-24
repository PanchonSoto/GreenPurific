import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalPurificadoraService } from '../../services/modal-purificadora.service';
import { PurificadoraService } from '../../services/purificadora.service';
import { Purificadora } from '../../models/purificadora.model';

@Component({
  selector: 'app-modal-purificadora',
  templateUrl: './modal-purificadora.component.html',
  styleUrls: ['./modal-purificadora.component.css']
})
export class ModalPurificadoraComponent {

  @ViewChild('formulario') miFormulario!: NgForm;
  public purificadora?: Purificadora;

  constructor(
    public modalPurific: ModalPurificadoraService, 
    private purificService: PurificadoraService
  ) { }


  formularioDefault() {
    const defecto = {
      nombre: this.modalPurific.obtenerPurificadora.nombre,
      estado: this.modalPurific.obtenerPurificadora.estado,
      localidad: this.modalPurific.obtenerPurificadora.localidad
    }
    this.miFormulario.resetForm(defecto);
  }

  cerrarModal() {
    this.modalPurific.cerrarModal();
    this.miFormulario.resetForm();
    this.formularioDefault();
  }

  guardar(form: NgForm) {
    const nombre = this.miFormulario.value.nombre;
    const estado = this.miFormulario.value.estado;
    const localidad = this.miFormulario.value.localidad;
    const id = this.modalPurific.obtenerPurificadora.pid;

    this.purificadora = { nombre, estado, localidad, pid: id }

    if(!form.valid) return;
    this.purificService.actualizarPurificadora(this.purificadora)
      .subscribe(res => {
        this.modalPurific.cerrarModal();
        this.modalPurific.nuevaPurific.emit(res);
      })
  }

}
