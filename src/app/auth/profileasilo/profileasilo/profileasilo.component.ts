import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CambiarimgComponent } from '../cambiarimg/cambiarimg.component';
import { ChangemailComponent } from '../changemail/changemail.component';


@Component({
  selector: 'app-profileasilo',
  templateUrl: './profileasilo.component.html',
  styleUrls: ['./profileasilo.component.scss']
})
export class ProfileasiloComponent implements OnInit {

  token: string = '';

  data: any = {};
  dataUser: any = {};
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  correo: string = '';
  idDoc: string = '';
  passw: string = '';
  aprobado: boolean = false;
  constructor(
    private _auth: AuthService,
    private _cookie: CookieService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.token = this._cookie.get('uid');

    this.getData();
    this.getDataFirebase();
  }

  getDataFirebase(){
    // console.log(this.re);
    
    this._auth.getPost(this.token)
    .subscribe((respData: any) =>{
      console.log(respData);
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          this.aprobado = f.data().aprobado;
          console.log(f.data());
        }
        
      }
    });
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

        this._auth.insertCorreo()
          .subscribe((resp) => {
            console.log(resp);
            this.dataUser = resp;

            console.log(this.dataUser);
          }

          );


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
            
            let num = (this.telefono.length > 0) ? this.telefono : this.data.phone;
           
            let corr = (this.correo.length > 0) ? this.correo : this.dataUser.email;
            

            if(this.correo.length > 0){

              this._auth.insertCorreo()
                .subscribe((respc) => {
                  respc.updateEmail(corr)
                    .then((r) => {
                      console.log('actualizado cooreo');
  
                    })
                    .catch((err) => {
                      console.log(err);
  
                    })
                })
            }


            if (this.passw.length > 0) {
              cambiarnom.updatePassword(this.passw)
                .then((phone) => {
                  console.log('cambiado contrasenia', this.passw);
                }).catch((error) => {
                  console.log(error);
                })
            }

            
            let dir = (this.direccion.length > 0) ? this.direccion : this.data.direccion;

            this._auth.updateDireccion(dir, num, this.idDoc)
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
  cambioPass(evento: any) {
    this.passw = evento;
  }

  cambiarcor() {
    if(this.correo.length > 0 || this.passw.length > 0){
      const dialog = this._dialog.open(ChangemailComponent, {
        disableClose: true,
      });
      dialog.afterClosed()
        .subscribe((resp) => {
          console.log(resp);
          
          if (resp) {
            this.guardar();
            this.passw = '';
            // this._auth.logout();
          }
        });
      
    }else{
      // this.getData();
      this.guardar();
    }

    

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
