import { EventEmitter, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Purificadora } from 'src/app/models/purificadora.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalPurificadoraService {

  private _ocultarModal = true;
  public img: string = '';
  public purificadora: Purificadora = {nombre: '', estado: '', localidad: '', pid: ''};

  // lo usaremos para mandar un emit desde el modalcomponent.ts hacia la lista de purificadoras.ts para que actualice la pagina
  public nuevaPurific: EventEmitter<any> = new EventEmitter();

  get ocultarModal() {
    return this._ocultarModal;
  }

  get obtenerPurificadora() {
    return {...this.purificadora};
  }

  get imagen() {
    return this.img;
  }


  abrirModal(purificadora: Purificadora) {
    this._ocultarModal = false;
    const imgUrl = `${base_url}/upload/purificadoras/${purificadora.img}`;
    this.purificadora = purificadora;
    this.img = imgUrl;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
