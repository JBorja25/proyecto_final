import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-regis-asi',
  templateUrl: './regis-asi.component.html',
  styleUrls: ['./regis-asi.component.scss']
})
export class RegisAsiComponent implements OnInit {
  public postForm:FormGroup;
  uuid: string = '';
  confirmar: boolean = false;
  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router: Router,
    private _cookie: CookieService,
    private _auth: AuthService
  ) {
    this.postForm= this.formBuilder.group({
      name:[''],
      address:[''],
      email:[''],
      fono:[''],
    });
    this.uuid = this._cookie.get('uid');
   }

  ngOnInit(): void {
    this.getDataFirebase();
  }

  getDataFirebase(){
    this._auth.getPost(this.uuid)
    .subscribe((respData: any) =>{
      console.log(respData);
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          this.confirmar = f.data()?.confirmacion;
        }

      }else{
        this.confirmar = true;
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
        let enviarFirebase = {
          ...this.postForm.value,
          uid: this.uuid,
          confirmacion: false
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
}
