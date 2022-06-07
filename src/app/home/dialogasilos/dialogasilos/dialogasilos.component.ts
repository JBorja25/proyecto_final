import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private _post: PostService,
    private _activated: ActivatedRoute
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

  

}
