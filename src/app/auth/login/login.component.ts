//import { User } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideRoutes, Router } from '@angular/router';
import { async } from '@firebase/util';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  verpass: boolean =true;
  nombre: any;
  //   =new FormGroup({
  //     email: new FormControl(''),
  //     password: new FormControl(''),
  // });
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private _fb: FormBuilder,
    private _cookie: CookieService,
    private _auth: AuthService,) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    // Validators.pattern
    this.loginForm = this._fb.group({
      email: ['', [Validators.email, Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }
/* errores email */
  get errorCorreo(){
    return this.loginForm.get('email').hasError('required') && (this.loginForm.get('email').touched || this.loginForm.get('email').dirty);
  }

  get errorPattern(){
    return this.loginForm.get('email').hasError('pattern') && (this.loginForm.get('email').touched || this.loginForm.get('email').dirty);
  }

  /* errores passw */
  get errorPass(){
    return this.loginForm.get('password').hasError('required') && (this.loginForm.get('password').touched || this.loginForm.get('password').dirty);
  }
  get errorPassMin(){
    return this.loginForm.get('password').hasError('minlength') && (this.loginForm.get('password').touched || this.loginForm.get('password').dirty);
  }


  async onLogin() {


    console.log('entra');
    /* if (!this.loginForm.invalid) {
      console.log(`formulario invalido ${this.loginForm.invalid}`);

      return;
    } */
    

    const { email, password } = this.loginForm.value;
    this.authSvc.login(email, password)
      .then((resp) => {
        Swal.fire({
          title: 'Validando credenciales',
          titleText: 'Comprobando credenciales, Espere por favor.......',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          icon: 'info',
          didOpen: () => {
            Swal.showLoading();
          }
        });
        console.log(resp);

        this.authSvc.traerDataFirebase(resp.user.uid)
          .subscribe((respData: any) => {
            console.log(respData);

            for (let d of respData.docs) {
              if (d.data().tipo === 'admin') {
                this.authSvc.guardarCookie('admin', resp.user.uid);
                Swal.close();
                this.router.navigateByUrl('/gerente/show');
                // localStorage.setItem('tipo', f.tipo);
              } else {
                console.log('entra en asilo ', d.data());

                this.authSvc.traerDataPost(d.data().uid)
                  .subscribe((respPost: any) => {
                    console.log(respPost)
                    if (!respPost.empty) {
                      for (let f of respPost.docs) {
                        console.log(f)
                        if (f.data()?.aprobado == true) {
                          this.authSvc.guardarCookie('asilos', resp.user.uid);
                          Swal.close();
                          this.router.navigateByUrl('/asilo/info');

                        } else {
                          this.authSvc.guardarCookie('asilos', resp.user.uid);
                          Swal.close();
                          this.router.navigateByUrl('/asilo/regis-asi');
                        }
                      }

                    } else {

                      setTimeout(() => (alert('Hello')), 1000);
                      this.authSvc.guardarCookie('asilos', resp.user.uid);
                      Swal.close();
                      this.router.navigateByUrl('/asilo/regis-asi');

                    }
                  })

              }

            }





          });

      })
      .catch((erro) => {
        console.log(erro.message);
        console.log(erro.code);
        if(erro.code == 'auth/wrong-password' || erro.code == 'auth/user-not-found'){

          Swal.fire({
            title: 'Validando credenciales',
            text: 'Usuario y contraseña son incorrectos, revise por favor',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }else{
          Swal.fire({
            title: 'Validando credenciales',
            text: 'Su cuenta ha sido temporalmente bloqueada debido a varios intentos, por favor intente mas tarde. Si el error persiste comuniquese con nombre@gmail.com',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }

      });
    /* try {
      // const user=await this.authSvc.login(email, password); 
      


    } catch (error) {
      console.log('error', error);
      // return error;
    } */

  }

  verContrasenia(){
    this.verpass = !this.verpass;
  }
  async cerrar() {
    this._cookie.deleteAll();
    await this._auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: false });
  }
}
