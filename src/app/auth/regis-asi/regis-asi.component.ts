import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../services/auth.service';

import { Post } from '../../models/post.model';
import { SubirfotosService } from '../services/subirfotos/subirfotos.service';

@Component({
  selector: 'app-regis-asi',
  templateUrl: './regis-asi.component.html',
  styleUrls: ['./regis-asi.component.scss']
})
export class RegisAsiComponent implements OnInit {
  showFiller = false;
  public postForm:FormGroup;
  uuid: string = '';
  confirmar: boolean = false;
  rechazar: boolean = false;
  mostrarFormulario: boolean = true;
  aprobado: boolean = false;
  cuentaVerificada:boolean = false;
  public registroAnterior: any = {};
  idDoc: string = '';
  mayus = 'mayus';
  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router: Router,
    private _cookie: CookieService,
    private _auth: AuthService,
    private _fotos: SubirfotosService
  ) {
    this.postForm= this.formBuilder.group({
      name:[''],
      address:[''],
      email:[''],
      fono:[''],
    });
    this.uuid = this._cookie.get('uid');
    this.registroAnterior = 'prueba de envio';
  }
  
  async ngOnInit() {
    this.getDataFirebase();
  }

  getDataFirebase(){
    // console.log(this.re);
    
    this._auth.getPost(this.uuid)
    .subscribe((respData: any) =>{
      console.log(respData);
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          console.log(f.data());
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
          this.confirmar = f.data()?.confirmacion;
          this.rechazar = f.data().rechazar;
          this.aprobado = f.data().aprobado;
          this.registroAnterior = f.data();
          this.cuentaVerificada=f.data().cuentaVerificada;
          this.idDoc = f.id;
        }
        
      }
    });
  }
  onSubmit(){
    // trear la data del usuario
    // iddoc
    this._auth.traerDataFirebase(this.uuid)
    .subscribe((respData) =>{
      console.log(respData);
      for(let f of respData.docs){
        let enviarFirebase: Post = {
          ...this.postForm.value,
          uid: this.uuid,
          mostrarRegistroAsilo: false,
          rechazar: false,
          confirmacion: true,
          aprobado: false,
          cuentaVerificada:false
        }
        this.postService.createPosts(enviarFirebase)
        .then((resp) =>{
          console.log('se registro correctamente' ,resp);
          this.getDataFirebase();
        })
      }
      
    })
    // // this.router.navigate(['/home'])
    // alert("registro realizado\muchas gracias ");
  }


  llenadoFormulario(evento: any){
    console.log(evento);
    this.getDataFirebase();
    
  }
/* 
  TODO: falta de hacer algo
*/
  // funciona para una imagen
  cambioImagen(evento: any){
    console.log(evento);
    this._fotos.insertImages(evento.target.files[0], evento.target.value);
    
  }



}
