import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form-bonos',
  templateUrl: './form-bonos.component.html',
  styleUrls: ['./form-bonos.component.css']
})
export class FormBonosComponent implements OnInit {

  public user: Usuario;
  public bonoForm: FormGroup;

  constructor(
    private srvEmpresa: EmpresasService,
    private userSrv: UsersService,
    private formBuilder: FormBuilder) {
      this.user = {nombre: ''} as Usuario;
    }


  ngOnInit(): void {
    // Check tipo bono [minutos/sesiones]
    this.bonoForm = this.formBuilder.group({
      idusuario: ['', [Validators.required]],
      cantidad: ['1', [Validators.required]],
      fecha: ['', [Validators.required]],
      tipobono: ['MINUTOS', [Validators.required]],
    });
  }

  selectUser() {
    this.userSrv.selectUser().subscribe(
      evtUser => {
        console.log("Event received");
        if (evtUser != undefined) {
          this.user = evtUser;
        }
      }
    );
  }

  cancelSelect() {
    this.userSrv.cancelSelectUser();
  }

  guardarBono() {
    console.log("Registrar Bono")

    const bono = {
      valor: this.bonoForm.get("cantidad").value,
      fechaLimite: this.bonoForm.get("fecha").value,
      tipo: this.bonoForm.get("tipobono").value
    }

    this.srvEmpresa.addBono(
      this.user._id,
      bono).subscribe(
        arg => {
          // Load user profile
          this.userSrv.reloadUsers();
        },
        err => {
          alert("No se ha podido registrar el Bono\n"+err)
          console.log("Error al registrar el Bono")
        }
      );
  }

  selectedUser(event) {
    this.user = event;
    // Hide user list
  }
}