import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../../services/auth.service';

AuthService
@Component({
  selector: 'app-givepass',
  templateUrl: './givepass.component.html',
  styleUrls: ['./givepass.component.scss']
})
export class GivepassComponent implements OnInit {
  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  alimentacion: string = '';
  aseo: string= '';
  transporteSelect: string= '';

  horaDesde: string= ''
horaHasta: string= ''
uid: string= '';
dias: any =  {
  name: 'Todos los dias',
  completed: false,
  color: 'primary',
  diasSemana: [
    { name: 'Lunes', completed: false, color: 'primary'},
    { name: 'Martes', completed: false, color: 'primary'},
    { name: 'Miercoles', completed: false, color: 'primary'},
    { name: 'Jueves', completed: false, color: 'primary'},
    { name: 'Viernes', completed: false, color: 'primary'},
    { name: 'Sabado', completed: false, color: 'primary'},
    { name: 'Domingo', completed: false, color: 'primary'}
  ]
};

controles: any[] = [
  {
    name:'Siquiatria',
    value: false
  },
  {
    name:'Fisioterapia',
    value: false
  },
  {
    name:'Sicoterapia',
    value: false
  },
  {
    name:'Terapia ocupacionales',
    value: false
  }
];

transportes: any[] = [
{
  name: 'Si',
  value: false
},
{
  name: 'No',
  value: false
}
];
serviciosAdicionales: any[] = [
  {serd:'Peluqueria',value:false},  
  {serd:'Entrega de Medicamentos',value:false},  
  {serd:'Acompañamiento a Citas Medicas',value:false},  
  {serd:'Dieta Especial',value:false},  
  {serd:'Cama Hospitalaria',value:false},  
  ]


mostrarImagen:string = ''

allComplete: boolean = false;

  constructor(private _fb: FormBuilder, private postService: PostService, private _token: CookieService,  public router: Router,
    private _cookie: CookieService,
    private _auth: AuthService,) {
    this.uid = this._token.get('uid');
   }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarinfo();
  }

  cargarinfo(){

    this.postService.getPostByUid(this.uid)
    .subscribe((resp: any) => {
      console.log(resp);
      
      for(let f of resp.docs){
        console.log(f.data());
        
        this.firstFormGroup.setValue({
          name: f.data()?.name,
          address: f.data().address,
          email: f.data().email,
          fono: f.data().fono
        });
        console.log(this.dias);
        for(let i = 0; i < this.dias.diasSemana.length; i++){
          this.dias.diasSemana[i].completed = f.data().horas[i].completed;
        }
        console.log(this.dias);
        for(let i = 0; i < this.controles.length; i++){
          this.controles[i].value = f.data().controlesMedicos[i].value;
        }
        for(let i = 0; i < this.serviciosAdicionales.length; i++){
          this.serviciosAdicionales[i].value = f.data().serviciosAdicionales[i].value;
        }
        
        this.horaDesde = f.data().horaDesde;
        this.horaHasta = f.data().horaHasta;
       this.mostrarImagen = f.data().foto;
       this.transporteSelect = f.data().transporte;
       this.alimentacion = f.data().alimentacion;
       this.aseo = f.data().aseo;
       

       console.log(this.controles);
       
       /* this.fourthFormGroup.setValue({
         alimentacion: f.data().alimentacion,
         aseo: f.data().aseo
       }) */
      }
    });
  }
  async cerrar(){
    this._cookie.deleteAll();
    await  this._auth.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true, skipLocationChange: false});
  }

  onSubmit(){}

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      fono: ['', Validators.required]
    });

    this.SecondFormGroup = this._fb.group({
      lunes: ['', Validators.required],
      martes: ['', Validators.required],
      miercoles: ['', Validators.required],
      jueves: ['', Validators.required],
      viernes: ['', Validators.required],
      sabado: ['', Validators.required],
      domingo: ['', Validators.required]
    });
    this.thirdFormGroup = this._fb.group({
    });

    this.fourthFormGroup = this._fb.group({
      alimentacion: [''],
      aseo: [''],
      transporte: [''],
      servAdicionales: [''],
      controlesMedicos: [''],

    })


  }

  cambioImagen(evento: any){

  }

  cambioImagenPdf(evento: any){

  }

  // funcion para seleccionar todas los dias
  algunasCompletadas():boolean {
    if(this.dias.diasSemana == null){
      return false;
    }
    return this.dias.diasSemana.filter((t:any) => t.completed).length > 0 && !this.allComplete;
  }

  setearTodos(completed: boolean){
    this.allComplete = completed;
    this.dias.completed = completed;
    if(this.dias.diasSemana == null){
      return;
    }
    console.log(this.dias);
    
    this.dias.diasSemana.forEach((t) => t.completed = completed);
  }

  actualizarSeleccionados(){
    console.log(this.dias);
    
    this.allComplete = this.dias.diasSemana != null && this.dias.diasSemana.every((t) => t.completed);
  }

  serviciosmedicos(evento: any){
    
  }

  serviciosadicionales(evento: any){

  }

  transporte(evento: any){

  }

  actualizar(){
    console.log(this.firstFormGroup.get('name'));
    
  } 

  prueba(evento: any){
    console.log(evento);
    
  }

}
