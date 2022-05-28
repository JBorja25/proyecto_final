import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-changemail',
  templateUrl: './changemail.component.html',
  styleUrls: ['./changemail.component.scss']
})
export class ChangemailComponent implements OnInit {

  contrasenia:string = '';

  constructor(
    private _auth: AuthService,
    private _dialog: MatDialogRef<ChangemailComponent>
  ) { }

  ngOnInit(): void {
  }


  verificar(){
    if(this.contrasenia.length == 0){
      return ;
    }
    this._auth.reautenticar(this.contrasenia)
    .then((resp) =>{
      console.log(resp);
      if(resp.user.uid.length > 0){
        this.cerrarDialog(true);
      }
    })
    .catch((err) =>{

    });

  }

  cerrarDialog(cerrar: boolean){
    this._dialog.close(cerrar);
  }

  cerrar(){
    this.cerrarDialog(false);
  }

  cambioPass(evento: any){
    this.contrasenia = evento;
  }

}
