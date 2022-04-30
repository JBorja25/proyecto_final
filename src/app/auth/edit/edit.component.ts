import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { PostService } from 'src/app/models/post.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup;
  postRef:any

  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      address: [''],
      email: [''],
      fono: ['']
    })
   }

  ngOnInit(): void {
    //console.log(this.activeRoute.snapshot.params) //desde aqui sacamos el id
    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.postService.getPostsById(id).subscribe(res => {
      this.postRef = res;
      this.editForm = this.formBuilder.group({
        name: [this.postRef.name],
        address: [this.postRef.address],
        email: [this.postRef.email],   
        fono: [this.postRef.fono]        
      })            
    })
  }

  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');   

    this.postService.updatePosts(this.editForm.value, id);
    this.router.navigate(['/show']);
    //console.log(this.editForm.value) //podemos ver los valores capturados
  }


}
