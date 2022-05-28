import { Component, OnInit } from '@angular/core';
import { PostService } from '../models/post.service';

// import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];

  constructor(
    private _post: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._post.getPostId()
    .subscribe((resp) =>{
      console.log(resp);
      this.posts = [];
      for(let f of resp.docs){
        this.posts.push(f.data());
      }
      console.log(this.posts);
      
    })
  }

}
