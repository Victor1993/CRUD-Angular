import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../models/usuarios.models';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faUser, faKey, faPhoneAlt, faCity, faGlobeAmericas, faUserEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../services/usuarios.service';

@Component({
    selector: 'app-mantenedor-usuarios',
    templateUrl: './mantenedor-usuarios.component.html',
    styleUrls: ['./mantenedor-usuarios.component.scss']
})
export class MantenedorUsuariosComponent implements OnInit {

    usuarios: Usuarios[] = [];
    indice: number;
    
    // Variables formulario
    registerForm!: FormGroup;
    submitted = false;

    // Iconos FontAwesome
    iconoNombre = faUser;
    iconoCorreo = faEnvelope;
    iconoClave = faKey;
    iconoTelefono = faPhoneAlt;
    iconoCodCiudad = faCity;
    iconoCodPais = faGlobeAmericas;
    iconoEditarUsuario = faUserEdit;
    iconoEliminarUsuario = faTrash;

    // Variables [(ngModel)]
    nombreInput: string;
    correoInput: string;
    claveInput: string;
    numTelefonoInput: string;
    codPaisInput: string;
    codCiudadInput: string;

    // Control visual de botones agregar y modificar
    _mostrarBotonAgregar: string = 'btn btn-primary mostrar';
    _mostrarBotonModidicar: string = 'btn btn-primary ocultar';
    _mostrarBotonCancelar: string = 'btn btn-danger ocultar espaciadoBotones';

    constructor(private formBuilder: FormBuilder, private usuarioService: UsuariosService) { }

    ngOnInit() {
        this.usuarios = this.usuarioService.usuarios;
        this.registerForm = this.formBuilder.group({
            nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^([A-Za-z áÁéÉíÍóÓúÚñÑüÜ]+)$/)]],
            correo: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            clave: ['', Validators.required],
            numTelefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(/^[0-9]*$/)]],
            codPais: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern(/^[0-9]*$/)]],
            codCiudad: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern(/^[0-9]*$/)]],
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.registerForm.controls;
    }

    accion(accion: string) {
        if (accion === 'agregar') {
            this.agregarUsuario();
        } else if (accion === 'modificar') {
            this.modificarUsuario(this.indice);
        } else if (accion === 'cancelar') {
            this.limpiarFormulario();
            this.mostrarBotonAgregar();
        }
    }

    agregarUsuario(): void {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        let usuario: Usuarios = {
            name: this.nombreInput,
            email: this.correoInput,
            password: this.claveInput,
            phone: {
                number: this.numTelefonoInput,
                contrycode: this.codPaisInput,
                citycode: this.codCiudadInput
            }
        }
        this.usuarioService.agregarUsuario(usuario);
        this.limpiarFormulario();
    }

    limpiarFormulario(): void {
        this.submitted = false;
        this.registerForm.reset();
    }

    cargarDatosEnFormulario(indice: number) {
        this.mostrarBotonModificar();
        if (indice >= 0) {
            this.submitted = true;
            this.indice = indice;
            this.nombreInput = this.usuarioService.usuarios[indice].name;
            this.correoInput = this.usuarioService.usuarios[indice].email;
            this.claveInput = this.usuarioService.usuarios[indice].password;
            this.numTelefonoInput = this.usuarioService.usuarios[indice].phone.number;
            this.codCiudadInput = this.usuarioService.usuarios[indice].phone.citycode;
            this.codPaisInput = this.usuarioService.usuarios[indice].phone.contrycode;
            this.submitted = false;
        } else {
            this.mostrarBotonAgregar();
        }
    }

    modificarUsuario(indice: number) {
        this.usuarioService.usuarios[indice].name = this.nombreInput;
        this.usuarioService.usuarios[indice].email = this.correoInput;
        this.usuarioService.usuarios[indice].password = this.claveInput;
        this.usuarioService.usuarios[indice].phone.number = this.numTelefonoInput;
        this.usuarioService.usuarios[indice].phone.citycode = this.codCiudadInput;
        this.usuarioService.usuarios[indice].phone.contrycode = this.codPaisInput;
        this.mostrarBotonAgregar();
        this.limpiarFormulario();
    }

    eliminarUsuario(indice: number) {
        if (confirm("¿Estás seguro que deseas eliminar a este usuario?")) {
            this.usuarioService.eliminarUsuario(indice);
            this.limpiarFormulario();
            this.mostrarBotonAgregar();
        } else {
            console.log("El usuario NO ha sido eliminado");
        }
    }

    mostrarBotonAgregar() {
        this._mostrarBotonAgregar = 'btn btn-primary mostrar';
        this._mostrarBotonModidicar = 'btn btn-primary ocultar';
        this._mostrarBotonCancelar = 'btn btn-danger ocultar espaciadoBotones';
    }

    mostrarBotonModificar() {
        this._mostrarBotonModidicar = 'btn btn-primary mostrar';
        this._mostrarBotonAgregar = 'btn btn-primary ocultar';
        this._mostrarBotonCancelar = 'btn btn-danger mostrar espaciadoBotones';
    }

    get nombre() {
        return this.registerForm.get('nombre');
    }

    get correo() {
        return this.registerForm.get('correo');
    }

    get clave() {
        return this.registerForm.get('clave');
    }

    get numTelefono() {
        return this.registerForm.get('numTelefono');
    }

    get codPais() {
        return this.registerForm.get('codPais');
    }

    get codCiudad() {
        return this.registerForm.get('codCiudad');
    }

}
