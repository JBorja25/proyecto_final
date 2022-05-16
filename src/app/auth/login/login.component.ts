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
      email: ['', Validators.email],
      password: ['', Validators.maxLength(6)]
    });
  }


  async onLogin() {


    console.log('entra');
    if (!this.loginForm.invalid) {
      console.log(`formulario invalido ${this.loginForm.invalid}`);

      return;
    }
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

    const { email, password } = this.loginForm.value;
    this.authSvc.login(email, password)
      .then((resp) => {
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
                          this.router.navigateByUrl('/asilo/regis-asi');

                        } else {
                          this.authSvc.guardarCookie('asilos', resp.user.uid);
                          Swal.close();
                          this.router.navigateByUrl('/home');
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

      });
    /* try {
      // const user=await this.authSvc.login(email, password); 
      


    } catch (error) {
      console.log('error', error);
      // return error;
    } */

  }
  async cerrar() {
    this._cookie.deleteAll();
    await this._auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: false });
  }
}
