import { Component, OnInit } from '@angular/core';
import { PostService } from '../models/post.service';
import SwiperCore from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { DialogasilosComponent } from './dialogasilos/dialogasilos/dialogasilos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];
  fecha = new Date().getFullYear();

  constructor(
    private _post: PostService,
    private _dialog: MatDialog,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.getPosts();
    
  }

  getPosts(){
    this._post.getPostId()
    .subscribe((resp: any) =>{
      console.log(resp);
      this.posts = [];
      for(let f of resp.docs){
        if(f.data().tipo != ' admin' && f.data().aprobado){
          this.posts.push(f.data());
        }
      }
      console.log(this.posts);
      
    })
  }

  abrirDialog(uid: any){
    this._route.navigateByUrl(`/info-asilo/${uid}`);
  }

}
