import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-dialogasilos',
  templateUrl: './dialogasilos.component.html',
  styleUrls: ['./dialogasilos.component.scss']
})
export class DialogasilosComponent implements OnInit {
  posts: any = {};
  uid: string= '';
  fecha = new Date().getFullYear();
  serviciosMedicos: boolean = false;
  serviciosSanitarios: boolean = false;
  serviciosAtencion: boolean = false;
  serviciosTerapeuticos: boolean = false;
  serviciosAdicionales: boolean = false;
  serviciosInstalaciones: boolean = false;
  mostrarBox: boolean = false;
  // serviciosMedicos: boolean = false;
  constructor(
    private _post: PostService,
    private _activated: ActivatedRoute,
    private _router: Router
  ) { 
    this.uid = this._activated.snapshot.paramMap.get('uid');
  }

  ngOnInit(): void {
      console.log();
      
    this.getPosts();
  }

  getPosts(){
    this._post.getPostByUid(this.uid)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.posts = [];
      for(let f of resp.docs){
        console.log(f.data());
        this.posts = f.data();

        
        // if(f.data().tipo != ' admin'){
        //   this.posts.push(f.data());
        // }
      }
      console.log(this.posts);
      
    })
  }

  navegarSeccion(fragment: string){
    // this._router.navigateByUrl(`info-asilo/${ this.uid }#` + fragment);
    window.location.replace(`info-asilo/${ this.uid }#` + fragment);
  }

 


  get serviciosMedicosFunc(){
    return this.posts?.controlesMedicos && this.posts?.controlesMedicos[0].children.some((valor) => valor.value === true);
  }

  get serviciosSanitariosFunc(){
    return this.posts?.servicioSanitarios && this.posts?.servicioSanitarios[this.posts?.servicioSanitarios.length - 1].children.some((valor) => valor.value === true);
  }
  get serviciosAtencionFunc(){
    return this.posts?.serviciosAtencion && this.posts?.serviciosAtencion[0].children.some((valor) => valor.value === true);
  }
  get serviciosTerapeuticosFunc(){
    return this.posts?.servisioTerapeuticos && this.posts?.servisioTerapeuticos[0].children.some((valor) => valor.value === true);
  }
  get serviciosAdicionalesFunc(){
    return this.posts?.serviciosAdicionales && (this.posts?.serviciosAdicionales.some((valor) => valor.value === true) && (this.posts.alimentacion === 'Si' || this.posts.aseo === 'si' || this.posts.transporte !== 'No'));
  }
  get serviciosComodidadFunc(){
    return this.posts?.serviciosComodidad && this.posts?.serviciosComodidad[0].children.some((valor) => valor.value === true);
  }

  get HorariosDias(){
    return this.posts?.horas?.diasSemana && this.posts.horas.diasSemana.every((dias) => dias.completed === true) ;
  }
  

}
