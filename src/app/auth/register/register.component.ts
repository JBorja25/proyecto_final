import { AuthService } from './../services/auth.service';
/*import { auth } from 'firebase/app';*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { provideRoutes, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthService],
})
export class RegisterComponent implements OnInit {
      registerForm=new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      nombre: new FormControl(''),
      direccion: new FormControl('')
  });

  enviarFirebase: any = {};
  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  
  async onRegister(){

    const{email, password}=this.registerForm.value;
    try {
     const user= await this.authSvc.register(email, password);
     console.log(user);
      this.enviarFirebase = {
        nombre: this.registerForm.get('nombre').value,
        direccion: this.registerForm.get('direccion').value,
        correo: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        tipo: 'asilo',
        uid: user.user.uid
      }
    


    this.authSvc.guardarInfoRegistro(this.enviarFirebase)
    .then((respFirebase)=>{
      console.log(respFirebase);
        if(user && respFirebase.id.length > 2){
          console.log('regsitrado correctamente');

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
}
