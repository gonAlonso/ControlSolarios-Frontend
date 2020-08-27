import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuario-empresa',
  templateUrl: './gestion-usuario-empresa.component.html',
  styleUrls: ['./gestion-usuario-empresa.component.css']
})
export class GestionUsuarioEmpresaComponent implements OnInit {

  public usuario: Usuario;
  public editUserForm: FormGroup;

  constructor(private empSrv: EmpresasService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const id = this.activatedRoute.snapshot.params.id;
    this.empSrv.getUsuario(id).subscribe(
      data => {
        this.usuario = data.datos;
        this.editUserForm = this.formBuilder.group({
          nombre: [this.usuario.nombre, [Validators.required]],
          dni: [this.usuario.dni, [Validators.required]],
          tlf: [this.usuario.tlf, [Validators.required]],
          email: [this.usuario.email, [Validators.required]],
          fototipo: [this.usuario.fototipo],
        });
      },
      error => {
        // Show error message
        console.log("Error al cargar la lista de usuarios");
      }
    );
  }

  guardarUsuario(form: FormGroup) {
    if (!form.valid) {
      alert("Datos de usuario incorrectos");
      return;
    }
    const nuevoUsuario = {
        nombre: form.get('nombre').value,
        dni: form.get('dni').value,
        tlf: form.get('tlf').value.toString(),
        email: form.get('email').value,
        fototipo: form.get('fototipo').value,
    };
    this.empSrv.updateUsuario(this.usuario._id, nuevoUsuario as Usuario).subscribe(
      ok => {
        this.loadUser();
        //TODO: Mostrar proceso OK
      },
      err => {
        alert("No se ha podido guardar la modificación");
      }
    );
  }

  eliminarUsuario() {
    throw new Error("Method not implemented.");
  }

}
