import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-regis-asi',
  templateUrl: './regis-asi.component.html',
  styleUrls: ['./regis-asi.component.scss']
})
export class RegisAsiComponent implements OnInit {
  public postForm:FormGroup
  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router: Router
  ) {
    this.postForm= this.formBuilder.group({
      name:[''],
      address:[''],
      email:[''],
      fono:[''],
    })
   }

  ngOnInit(): void {
  }
  onSubmit(){
    this.postService.createPosts(this.postForm.value)
    this.router.navigate(['/home'])
    alert("registro realizado\muchas gracias ");
  }
}
