import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CambiarimgComponent } from '../cambiarimg/cambiarimg.component';
import { ChangemailComponent } from '../changemail/changemail.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profileasilo',
  templateUrl: './profileasilo.component.html',
  styleUrls: ['./profileasilo.component.scss']
})
export class ProfileasiloComponent implements OnInit {

  token: string = '';
  verpass: boolean = false;
  data: any = {};
  dataUser: any = {};
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  correo: string = '';
  idDoc: string = '';
  passw: string = '';
  mostrarFormulario: boolean = true;
  aprobado: boolean = false;
  patternCorreo: boolean = false;

  profileAsilo: FormGroup;

  constructor(
    private _auth: AuthService,
    private _cookie: CookieService,
    private _dialog: MatDialog,
    public router: Router,
    private toastr: ToastrService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.token = this._cookie.get('uid');

    this.getData();
    this.getDataFirebase();
    
    this.crearFormulario();

    this._auth.insertCorreo()
          .subscribe((resp) => {
            
            this.dataUser = resp;

            
          }

          );
  } 

  crearFormulario(){
    this.profileAsilo = this._fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      telefono: [''],
      direccion: [''],
      email: ['', [Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      passw: ['', [Validators.minLength(6)]]
    })
  }

  getDataFirebase(){
    // 
    
    this._auth.getPost(this.token)
    .subscribe((respData: any) =>{
      
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          this.aprobado = f.data().aprobado;
          
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
        }
        
      }
    });
  }

  verContrasenia(){
    this.verpass = !this.verpass;
  }


  getData() {
    this._auth.traerDataFirebase(this.token)
      .subscribe((resp: any) => {
        

        for (let f of resp.docs) {
          // this.data = f.data()
          this.idDoc = f.id;
          

          this._auth.insertName()
          .subscribe((resp) =>{
            this.profileAsilo.setValue({
              nombre: resp.displayName,
              telefono: f.data().phone,
              direccion: f.data().direccion,
              email: resp.email,
              passw: ''
            })
          });
        }
        


        

        


      });
  }

  async cerrar(){
    this._cookie.deleteAll();
    await  this._auth.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }
  async cerrarProfile(){
    this._cookie.deleteAll();
    this.router.navigateByUrl('/login', {replaceUrl: true});
    const logout = await  this._auth.logout();    
    this.toastr.success('Informacion modificar con exito', 'Actualizacion', {
      progressAnimation: 'decreasing',
      progressBar: true
    })

    
  }

  guardar() {


    // if de la contrasenia
    this._auth.insertName()
      .subscribe((cambiarnom) => {
        

        let nom =this.profileAsilo.get('nombre').value.length > 0 ? this.profileAsilo.get('nombre').value : this.dataUser.displayName; //copia lineas y cambiar
        let dir = (this.profileAsilo.get('direccion').value.length > 0) ? this.profileAsilo.get('direccion').value : this.data.direccion;
        let num = (this.profileAsilo.get('telefono').value.length > 0) ? this.profileAsilo.get('telefono').value : this.data.phone;
        cambiarnom.updateProfile({
          displayName: nom
        })
          .then((nombre) => {
            
            if((this.profileAsilo.get('email').dirty || this.profileAsilo.get('email').touched)){
              let corr = (this.profileAsilo.get('email').value.length > 0) ? this.profileAsilo.get('email').value : this.dataUser.email;
              console.log(corr);
              
              this._auth.insertCorreo()
                .subscribe((respc) => {
                  
                  
                  respc.updateEmail(corr)
                    .then((r) => {
                      
                      this._auth.updateDireccion(dir, num, this.idDoc)
                      .then((respDirec) => {
                        
                        // this.getData();
                       /* this._auth.singout()
                        .then((resp) =>{
                          
                        })
      */              this.cambiarcor();
                        this.getData();
                        
                       // this._auth.reautenticar()
     //this.cerrarProfile();
                      })
                      .catch((error) => { });
                      
                    })
                    .catch((err) => {
                      console.log('ingresa error correo');
                      this.toastr.warning('el correo ingresado ya existe', 'Correo invalido',{
                        progressAnimation: 'increasing',
                        progressBar: true
                      })
                      
                      
                    })
                    
                })
            }else if ((this.profileAsilo.get('passw').dirty || this.profileAsilo.get('passw').touched)) {
                let passw = this.profileAsilo.get('passw').value;
                cambiarnom.updatePassword(passw)
                  .then((phone) => {
            
                  this._auth.updateDireccion(dir, num, this.idDoc)
                    .then((respDirec) => {
                      this.getData();
                      //this.cerrarProfile()

                    })
                    .catch((error) => { });
                    
                  }).catch((error) => {
                    console.log(error);
                    
                  })
              }else if((this.profileAsilo.get('email').dirty || this.profileAsilo.get('email').touched) && (this.profileAsilo.get('passw').dirty || this.profileAsilo.get('passw').touched)){
                let corr = (this.profileAsilo.get('email').value.length > 0) ? this.profileAsilo.get('email').value : this.dataUser.email;

                this._auth.insertCorreo()
                  .subscribe((respc) => {
                    respc.updateEmail(corr)
                      .then((r) => {
                        let passw = this.profileAsilo.get('passw').value;
                          cambiarnom.updatePassword(passw)
                            .then((phone) => {
                      
                            this._auth.updateDireccion(dir, num, this.idDoc)
                              .then((respDirec) => {
                                this.getData();
                                //this._auth.logout();

                              })
                              .catch((error) => { });
                              
                            }).catch((error) => {
                              console.log(error);
                              
                            })
                        
                        
                      })
                      .catch((err) => {
                        console.log('ingresa error correo y contrasenia');
                        this.toastr.warning('el correo ingresado ya existe', 'Correo invalido',{
                          progressAnimation: 'increasing',
                          progressBar: true
                        })
                        
                        
                      })
                      
                  })
              }else{
                this._auth.updateDireccion(dir, num, this.idDoc)
                .then((respDirec) => {
                  
                  this.getData();

                })
                .catch((error) => { });
                
              }
            

            
            
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
    if(this.correo.match('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')){
      this.patternCorreo = false;
    }else{
      this.patternCorreo = true;
    }
  }
  cambioPass(evento: any) {
    this.passw = evento;
  }

  cambiarcor() {
    if(this.correo.length > 0 || this.passw.length > 0){
      this
      const dialog = this._dialog.open(ChangemailComponent, {
        disableClose: true,
      });
      dialog.afterClosed()
        .subscribe((resp) => {
          
          
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


  /* Errores */

  get errorNombre(){
    return this.profileAsilo.get('nombre').hasError('required') && (this.profileAsilo.get('nombre').touched || this.profileAsilo.get('nombre').dirty);
  }
  get errorNombreMin(){
    return this.profileAsilo.get('nombre').hasError('minlength') && (this.profileAsilo.get('nombre').touched || this.profileAsilo.get('nombre').dirty);
  }

  get errorCorreo(){
    return this.profileAsilo.get('email').hasError('pattern') && (this.profileAsilo.get('email').touched || this.profileAsilo.get('email').dirty);
  }
  get errorCorreoVacio(){
    return this.profileAsilo.get('email').value.length > 0 && (this.profileAsilo.get('email').touched || this.profileAsilo.get('email').dirty);
  }

  get errorPassw(){
    return this.profileAsilo.get('passw').hasError('minlength') && (this.profileAsilo.get('passw').touched || this.profileAsilo.get('passw').dirty);
  }
  get errorPasswVacio(){
    return this.profileAsilo.get('passw').value.length > 0 && (this.profileAsilo.get('passw').touched || this.profileAsilo.get('passw').dirty);
  }
  




}
