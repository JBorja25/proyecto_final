//import { User } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideRoutes, Router } from '@angular/router';
import { async } from '@firebase/util';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  nombre: any;
//   =new FormGroup({
//     email: new FormControl(''),
//     password: new FormControl(''),
// });
  constructor(private authSvc:AuthService,private router:Router, private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    // Validators.pattern
    this.loginForm = this._fb.group({
      email: ['', Validators.email],
      password: ['', Validators.maxLength(6)]
    });
  }

  
  async onLogin(){
    console.log('entra');
    if(!this.loginForm.invalid){
      console.log(`formulario invalido ${ this.loginForm.invalid }`);
      
      return;
    }
    
    const {email, password}=this.loginForm.value;
    this.authSvc.login(email, password)
    .then((resp) =>{
      console.log(resp);

      this.authSvc.traerDataFirebase(resp.user.uid)
      .subscribe((respData: any) =>{
        console.log(respData);

        for(let f of respData){
          if(f.tipo == 'admin' || f?.tipo){
            this.router.navigateByUrl('admin');
            localStorage.setItem('tipo', f.tipo);
          }else{
            
            this.router.navigateByUrl('asilo');
          }
        }
        
      });
      
    })
    .catch((erro)=>{
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
}
