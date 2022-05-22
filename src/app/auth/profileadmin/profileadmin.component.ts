import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CambiarimgComponent } from '../profileasilo/cambiarimg/cambiarimg.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-profileadmin',
  templateUrl: './profileadmin.component.html',
  styleUrls: ['./profileadmin.component.scss']
})
export class ProfileadminComponent implements OnInit {

  token: string = '';

  data: any = {};
  dataUser: any = {};
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  correo: string = '';
  idDoc: string = '';
  constructor(
    private _auth: AuthService,
    private _cookie: CookieService,
    private _id: MatDialog,
    private _dialog: MatDialog,
  ) { }


  ngOnInit(): void {
  }


  getData() {
    this._auth.traerDataFirebase(this.token)
      .subscribe((resp) => {
        console.log(resp);

        for (let f of resp.docs) {
          this.data = f.data()
          this.idDoc = f.id;
        }
        console.log(this.data);


        console.log(this.data);

        this._auth.getCurrentUser()
          .then((resp) => {
            console.log(resp);
            this.dataUser = resp;

          }

          )

          .catch((err) => { });

        console.log(this.dataUser);

      });
  }

  cerrar() {

  }


  guardar() {
    // if de la contrasenia
    this._auth.insertName()
      .subscribe((cambiarnom) => {
        console.log(this.nombre);

        let nom = this.nombre.length > 0 ? this.nombre : this.dataUser.displayName; //copia lineas y cambiar
        cambiarnom.updateProfile({
          displayName: nom
        })
          .then((nombre) => {
            console.log('cambiado nombre');
            console.log(this.direccion);
            /* poner codigo aqui */
          /*  let num = (this.telefono.length > 0) ? this.telefono : this.dataUser.phone;
            cambiarnom.updatePhoneNumber({
              phone: num
            })
              .then((phone) => {
                console.log('cambiado telefono');
              }).catch((error) => { });
*/
            /* poner codigo aqui */
              /*let corr= (this.correo.length>0)? this.correo : this.dataUser.correo;
              cambiarnom.updateEmail({
                correo:corr
              }).then((phone) => {
                console.log('cambiado telefono');
              }).catch((error) => { });*/
             
              

            /* poner codigo aqui */

            
            /* poner codigo aqui */
            let dir = (this.direccion.length > 0) ? this.direccion : this.data.direccion;

            this._auth.updateDireccion(dir, this.idDoc)
              .then((respDirec) => {
                console.log('se actualizo');
                this.getData();

              })
              .catch((error) => { });
          })
      });
  }

  cambioNombre(evento: any) {
    this.nombre = evento;
  }

  cambioTelefono(evento: any) {
    this.telefono = evento;
  }

  cambioDireccion(evento: any) {
    this.direccion = evento;
  }
  cambioCorreo(evento: any) {
    this.correo = evento;
  }


  cambiarImg(evento: any) {

    const dialog = this._dialog.open(CambiarimgComponent, {
      disableClose: false,
      data: {
        data: this.dataUser.displayName
      }

    });

    dialog.afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getData();
        }
      })

  }
}
