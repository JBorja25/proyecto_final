import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-regisall',
  templateUrl: './regisall.component.html',
  styleUrls: ['./regisall.component.scss']
})
export class RegisallComponent implements OnInit {

  @Input() registroAnterio: any;
  @Input() idDoc: string;
  llenadoFormulario: boolean = false;

  
  @Output() llenado: EventEmitter<boolean> = new EventEmitter();

  public postForm:FormGroup
  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router: Router,
    private _auth: AuthService
  ) {
    this.postForm= this.formBuilder.group({
      name_due:[''],
      address_due:[''],
      email_due:[''],
      fono_due:[''],
      nacionality:[''],
    });
    
  }
  
  ngOnInit(): void {
    console.log(this.registroAnterio);
    console.log(this.idDoc);
  }
  onSubmit(){
    let enviarFirebase = {
      ...this.postForm.value,
      ...this.registroAnterio,
      aprobado: false
    };

    
    
    console.log(enviarFirebase);
    
    this.postService.updatePost(enviarFirebase, this.idDoc)
    .then((resp) =>{
      console.log(resp);
      this.getData();
    })
    .catch((erro) =>{
      console.log(erro);
      
    });
    // this.router.navigate(['/home'])
  }


  getData(){
    this._auth.getPost(this.registroAnterio.uid)
    .subscribe((respData: any) =>{
      console.log(respData);
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          this.llenadoFormulario = f.data().aprobado;
          this.llenado.emit(this.llenadoFormulario);
        }
        
      }
    });
  }

}
