import { Injectable } from '@angular/core';
import { usuarioInicial } from '../models/mock-usuario';
import { Usuarios } from '../models/usuarios.models';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    usuarios: Usuarios[] = [(usuarioInicial)];

    constructor() { }

    agregarUsuario(usuario: Usuarios) {
        this.usuarios.push(usuario);
    }

    eliminarUsuario(indice: number) {
        this.usuarios.splice(indice, 1);
    }

}
