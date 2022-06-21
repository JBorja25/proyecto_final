import { AuthService } from './../services/auth.service';
/*import { auth } from 'firebase/app';*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { provideRoutes, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthService],
})
export class RegisterComponent implements OnInit {
  verpass: boolean =true;
      registerForm=new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      nombre: new FormControl(''),
      direccion: new FormControl('')
  });

  enviarFirebase: any = {};
  constructor(private authSvc:AuthService, private router:Router,    private _cookie: CookieService,
    private _auth: AuthService) { }

  ngOnInit(): void {
  }
  
  async onRegister(){

    const{email, password ,nombre}=this.registerForm.value;
    try {
     const user= await this.authSvc.register(email, password);
     console.log(user);
      this.enviarFirebase = {
        direccion: this.registerForm.get('direccion').value,
        tipo: 'asilo',
        uid: user.user.uid,
        phone: '',
        password: this.registerForm.get('password').value,
        foto: ''
      }

      this.authSvc.insertName()
      .subscribe((resp) =>{
        resp.updateProfile({
          displayName: nombre
        }).then((resp) =>{
          console.log(resp);
          
        })

        
      });

      
      
    


    this.authSvc.guardarInfoRegistro(this.enviarFirebase)
    .then((respFirebase: any)=>{
      console.log(respFirebase.user);
        
        if(user && respFirebase.id.length > 2){
          console.log('regsitrado correctamente');
          this.authSvc.guardarCookie('asilos', user.user.uid);

          this.router.navigateByUrl('asilo/regis-asi');
          
        }else{
          console.log('no se pudo registrar');
          return;
          
        }
    } )
    .catch((erroResp) =>{
      console.log(erroResp);
      
    });
     
     /*.then((rest)=>{
      console.log(rest);
    })*/
      /* if (user) {
      
        this.router.navigate(['/home']);
      } */

    } catch (error) {
      console.log(error);
      return error;
    }



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
