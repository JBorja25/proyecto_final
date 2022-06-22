import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-allsilos',
  templateUrl: './allsilos.component.html',
  styleUrls: ['./allsilos.component.scss']
})
export class AllsilosComponent implements OnInit {

  posts: any[] = [];

  constructor(
    private _post: PostService
  ) { }

  ngOnInit(): void {
    this.getAllPostAsilos();
  }

  getAllPostAsilos(){
    this._post.getPostId()
    .subscribe((resp) =>{
      for(let f of resp.docs){
        console.log(f.data());
        
        this.posts.push(f.data());
        
      }
      
    })
  }

}
