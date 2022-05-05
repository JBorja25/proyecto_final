import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-regisall',
  templateUrl: './regisall.component.html',
  styleUrls: ['./regisall.component.scss']
})
export class RegisallComponent implements OnInit {
  public postForm:FormGroup
  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router: Router
  ) {
    this.postForm= this.formBuilder.group({
      name_due:[''],
      address_due:[''],
      email_due:[''],
      fono_due:[''],
      nacionality:[''],
    })
   }

  ngOnInit(): void {
  }
  onSubmit(){
    this.postService.createPosts(this.postForm.value)
    this.router.navigate(['/home'])
  }

}
