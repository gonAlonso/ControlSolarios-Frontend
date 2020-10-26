import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa';
import { Usuario } from 'src/app/models/usuario';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-gestion-sesiones',
  templateUrl: './gestion-sesiones.component.html',
  styleUrls: ['./gestion-sesiones.component.css']
})
export class GestionSesionesComponent implements OnInit {

  @Input() user: Usuario;
  @Output() sendReload: EventEmitter<string>;

  public empresa: Empresa;
  public sessionForm: FormGroup;

  constructor(
    private empSrv: EmpresasService,
    private userSrv: UsersService,
    private formBuilder: FormBuilder) {
      this.sendReload = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.sessionForm = this.formBuilder.group({
      solario: ['', [Validators.required]],
      duracion: ['1', [Validators.required]],
      operario: ['', [Validators.required]],
    });

    this.empSrv.getDataEmpresa().subscribe(
      res => {
        this.empresa = res.datos;
        console.log("Empresa cargada:" + JSON.stringify(this.empresa))
      }
    );
  }


  selectUser() {
    const event = this.userSrv.selectUser().subscribe(
      evtUser => {
        if (evtUser != undefined) {
          console.log("UPDATE");
          this.user = evtUser;
        }
        event.unsubscribe();
      }
    );
  }


  saveNewSession() {

  }
}