import { Component, OnInit } from '@angular/core';
//importa el modelo 
import { Post } from 'src/app/models/post.model';
//importar servico
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  Post: Post[]
    constructor(private postService:PostService) { }
  
    ngOnInit(): void {
      this.postService.getPosts().subscribe((res)=>{
        this.Post= res.map((e)=>{
          return {
            id:e.payload.doc.id,
            ...(e.payload.doc.data() as Post)
          };
        });
      });
    }
    deleteRow=(post)=> this.postService.deletePosts(post);
  }
  