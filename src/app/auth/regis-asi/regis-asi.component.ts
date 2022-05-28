import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../services/auth.service';

import { DomSanitizer } from '@angular/platform-browser';

import { Post } from '../../models/post.model';
import { SubirfotosService } from '../services/subirfotos/subirfotos.service';
import { ThemePalette } from '@angular/material/core';

// uso de interface por obligacion de material design
export interface diasI {
  name: string,
  color: ThemePalette,
  completed: boolean,
  diasSemana?: diasI[]
}

@Component({
  selector: 'app-regis-asi',
  templateUrl: './regis-asi.component.html',
  styleUrls: ['./regis-asi.component.scss']
})
export class RegisAsiComponent implements OnInit, AfterViewInit {
  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

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

serviciosMedicosSelected: any[] = [];
serviciosAdicionalesSelected: any[] = [];

serviciosAdicionales: any[] = [
  {serd:'Peluqueria',value:false},  
  {serd:'Entrega de Medicamentos',value:false},  
  {serd:'Acompañamiento a Citas Medicas',value:false},  
  {serd:'Dieta Especial',value:false},  
  {serd:'Cama Hospitalaria',value:false},  
  ]

  toppings: FormGroup;
  showFiller = false;
  public postForm:FormGroup;
  uuid: string = '';
  confirmar: boolean = false;
  rechazar: boolean = false;
  mostrarFormulario: boolean = true;
  aprobado: boolean = false;
  cuentaVerificada:boolean = false;
  public registroAnterior: any = {};
  idDoc: string = '';
  mayus = 'mayus';
  mostrarImagen: any = '';
  FotoSubir: File;

  urlFotofirebase: any = '';
  rool:string='';
  nombre: string= '';

  documentoPDF: string = '';

  // variables para los checkboxes

  dias: diasI = {
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
  }
  allComplete: boolean = false;


  // ===============================================================
  // variables para las horas
  horaDesde: string='';
  horaHasta: string = '';
  mensaje: string= '';
  
  constructor(
    public postService:PostService,
    public formBuilder:FormBuilder,
    public router: Router,
    private _cookie: CookieService,
    private _auth: AuthService,
    private _fotos: SubirfotosService,
    private _sanitazer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _fb: FormBuilder,
    private _post: PostService
  ) {
    this.postForm= this.formBuilder.group({
      name:[''],
      address:[''],
      email:[''],
      fono:[''],
    });
    this.uuid = this._cookie.get('uid');
    this.registroAnterior = 'prueba de envio';
  }

  async ngOnInit() {
    this.crearFormulario();
    
    this.getDataFirebase(); 
  }
  ngAfterViewInit(): void {
    
    this.rool=this._cookie.get('tipo')
    this._auth.traerDataFirebase(this.uuid)
    .subscribe((respData: any) =>{
      for(let f of respData.docs){
        
        console.log(f.data());
        
       
        
      }
    });
    
  }
  
  
 
  getDataFirebase(){
    // console.log(this.re);
    
    this._auth.getPost(this.uuid)
    .subscribe((respData: any) =>{
      console.log(respData);
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          console.log(f.data());
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
          this.confirmar = f.data()?.confirmacion;
          this.rechazar = f.data().rechazar;
          this.aprobado = f.data().aprobado;
          this.registroAnterior = f.data();
          this.cuentaVerificada=f.data().cuentaVerificada;
          this.idDoc = f.id;
          this.mensaje = f.data().mensaje;
        }
        
      }
    });
  }
  onSubmit(){
    // trear la data del usuario
    // iddoc
    console.log(this.firstFormGroup.invalid, this.thirdFormGroup.value);
    console.log(this.dias, this.horaDesde, this.horaHasta);
    console.log(this.dias.diasSemana.filter((t) => t.completed));
    // console.log(this.fourthFormGroup);
    // console.log(this.thirdFormGroup);
    console.log(this.serviciosAdicionalesSelected);
    console.log(this.serviciosMedicosSelected);
    
    
    
    
    
    /* if(!this.firstFormGroup.invalid){
      return;
    } */
    this._auth.traerDataFirebase(this.uuid)
    .subscribe((respData) =>{
      console.log(respData);
      for(let f of respData.docs){
        let enviarFirebase = {
          ...this.firstFormGroup.value,
          uid: this.uuid,
          mostrarRegistroAsilo: false,
          rechazar: false,
          confirmacion: true,
          aprobado: false,
          cuentaVerificada:false,
          foto: this.urlFotofirebase,
          mensaje: '',
          documento: this.documentoPDF,
          horas: this.dias.diasSemana.filter((t) => t.completed || !t.completed),
          horaDesde: this.horaDesde,
          horaHasta: this.horaHasta,
          transporte: this.thirdFormGroup.get('transporte').value,
          aseo: this.thirdFormGroup.get('aseo').value,
          alimentacion: this.thirdFormGroup.get('transporte').value,
          controlesMedicos: this.controles,
          serviciosAdicionales: this.serviciosAdicionales,
        }
        // console.log(enviarFirebase);
        
        this.postService.createPosts(enviarFirebase)
        .then((resp) =>{
          console.log('se registro correctamente' ,resp);
          this.getDataFirebase();

          // this._fotos.insertImages(this.FotoSubir);

        })
      }
      
    })
    // // this.router.navigate(['/home'])
    // alert("registro realizado\muchas gracias ");
  }


  llenadoFormulario(evento: any){
    console.log(evento);
    this.getDataFirebase();
    
  }

/* 
  TODO: falta de hacer algo
*/
  // funciona para una imagen
  cambioImagen(evento: any){
    
    console.log(evento);
    this.FotoSubir = evento.target.files[0];
    const rul =URL.createObjectURL(evento.target.files[0]);
    this.mostrarImagen = (evento.target.files.length > 0) ? this._sanitazer.bypassSecurityTrustUrl(rul): '';
    console.log(rul);
    this._fotos.insertImages(this.FotoSubir, this.firstFormGroup.get('name').value)
    .then((resp)=>{
      console.log(resp.ref);
      
      resp.ref.getDownloadURL()
      .then((respGet)=>{
        this.urlFotofirebase = respGet;
      })
      .catch((error) =>{

      });
    }).catch((error)=>{

    });
    
  }


  cambioImagenPdf(evento: any){
    console.log(evento.target.files[0]);
    this._fotos.insertarPDF(evento.target.files[0])
    .then((respPDF) =>{
      // console.log(respPDF.task.then(i => i.));
      respPDF.task.then((resp) =>{
        resp.ref.getDownloadURL().then((r) =>{
          console.log(r);

          this.documentoPDF = r;
          
        })
        .catch((err) =>{})
        
      })
      
    })
    .catch((error) =>{
      console.log(error);
      
    })
    
  }

  async cerrar(){
    this._cookie.deleteAll();
    await  this._auth.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true, skipLocationChange: false});
  }

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      fono: ['', Validators.required]
    });

    /* this.SecondFormGroup = this._fb.group({
      lunes: ['', Validators.required],
      martes: ['', Validators.required],
      miercoles: ['', Validators.required],
      jueves: ['', Validators.required],
      viernes: ['', Validators.required],
      sabado: ['', Validators.required],
      domingo: ['', Validators.required]
    }); */
    this.fourthFormGroup = this._fb.group({
      img: ['', Validators.required],
      doc: ['', Validators.required]
    });

    this.thirdFormGroup = this._fb.group({
      alimentacion: [''],
      aseo: [''],
      controlesMedicos: [''],
      transporte: [''],
      servAdicionales: ['']
    });


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
    // console.log(evento);
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.controles.map((t) =>{
        if(evento.source.value === t.name){
          t.value = true;
        }
        return t;
      })
      console.log(this.controles);
    }else{
      this.controles.map((t) =>{
        if(evento.source.value === t.name){
          t.value = false;
        }
        return t;
      })
      console.log(this.controles);
      
    }
    
  }
  
  transporte(evento: any) {
    
  }
  
  serviciosadicionales(evento : any) {
    console.log(evento);
    console.log(this.thirdFormGroup);
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      // this.serviciosAdicionales = this.serviciosAdicionales.forEach()
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.serd){
          t.value = true;
        }
        return t;
      })
      console.log(this.serviciosAdicionales);
      
      // this.serviciosAdicionalesSelected.push(evento.source.value);
    }else{
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.serd){
          t.value = false;
        }
        return t;
      })
      console.log(this.serviciosAdicionales);
      
    }

  }
}
