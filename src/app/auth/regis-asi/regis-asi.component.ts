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
import { ToastrService } from 'ngx-toastr';

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
  misionGroup: FormGroup;
  comprobarVacio: boolean =false;
  imagen: string= '';
  informacion: any;
  verificarCedulaBool: boolean = false;
/**swrvicios adicionales*/
serviciosMedicos: any = [
  {
    name: 'Servicios Medicos',
    children: [
      {name:'Oxigeno', value: false}, 
      {name:'Terapias Respiratorias', value: false}, 
      {name: 'Terapias Musculares', value: false}, 
      {name: 'Cuidados Postoperatorios', value: false}, 
      {name: 'Dialisis', value: false}, 
      {name: 'Sondas', value: false}, 
      {name: 'Ostomias', value: false}, 
      {name: 'Terapias Cognitivas', value: false}, 
      {name: 'Terapias Diabetes', value: false}, 
    ]
  }
                            
]
/*------------------------------------------------------*/
/**swrvicios adicionales*/
serviciosSanitarios: any = [
  {
    name: 'Servicios Sanitarios',
    children: [
      {name:'Cuidados de enfermería 24 horas', value: false}, 
      {name:'Valoración gerontológica', value: false}, 
      {name: 'Asistencia médica', value: false}, 
      {name: 'Cuidados continuados para enfermos crónicos', value: false}, 
      {name: 'Gestión farmacéutica', value: false}, 
    ]
  }
                            
]
/*------------------------------------------------------*/
/**swrvicios adicionales*/
serviciosTerapeuticos: any = [
  {
    name: 'Servicios Terapeuticos',
    children: [
      {name:'Programa de estimulación cognitiva', value: false}, 
      {name:'Programa de estimulación multisensorial', value: false}, 
      {name: 'Programa de mantenimiento y actividad física', value: false}, 
      {name: 'Programa de terapia funcional', value: false}, 
      {name: 'Programa de rehabilitación y fisioterapia', value: false}, 
      {name: 'Programa de terapia ocupacional para apoyo en las ABIVD´s*', value: false}, 
      {name: 'Programa de atención centrada en la persona', value: false}, 
      {name: 'Programa de memoria y reminiscencias', value: false}, 
      
    ]
  }
                            
]
/*------------------------------------------------------*/
/**swrvicios adicionales*/
serviciosComodidad: any = [
  {
    name: 'Servicios Comodidad',
    children: [
      {name:'Cocina propia', value: false}, 
      {name:'Comedor', value: false}, 
      {name: 'Sala de T.V.', value: false}, 
      {name: 'Sala de estar', value: false}, 
      {name: 'Rincones significativos', value: false}, 
      {name: 'Patio y terrazas', value: false}, 
      {name: 'Limpieza y lavandería', value: false}, 

    ]
  }
                            
]
/*------------------------------------------------------*/
serviciosatencion: any = [
  {
    name: 'Servicios atencion',
    children: [
      {name:'Itinerario personalizado', value: false}, 
      {name:'Plan de atención integral', value: false}, 
      {name: 'Personal de referencia', value: false}, 
      {name: 'Proyecto de vida', value: false}, 
      {name: 'Escuela de familias', value: false}, 
      {name: 'Grupo de apoyo familiar', value: false}, 
     ]
  }
                            
]



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
cantidadAseo: string= ''
cantidadServicios: string= ''
cantidadTransporte: string= ''
cantidadAdicionales: string= ''
cantidadSanitarios: string= ''
cantidadTerapeuticos: string= ''
cantidadInstalaciones: string= ''
cantidadAtencion: string= ''

cantidadAlimentacion: string = '';

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
  // modificarRechazar: boolean = false;
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

  data: any= {};

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
    private _post: PostService,
    private _toast: ToastrService
  ) {
    this.postForm= this.formBuilder.group({
      name:['',Validators.required],
      address:['',Validators.required],
      email:['',Validators.required],
      fono:['',Validators.required],
    });
    this.uuid = this._cookie.get('uid');
    this.registroAnterior = 'prueba de envio';
    this.crearFormulario();
  }

  async ngOnInit() {
    
    
    this.getDataFirebase(); 
    this.cargarinfo();
  }
  ngAfterViewInit(): void {
    
    this.rool=this._cookie.get('tipo')
    /* this._auth.traerDataFirebase(this.uuid)
    .subscribe((respData: any) =>{
      for(let f of respData.docs){
        
        
        
       
        
      }
    }); */
    
  }
  
  
 
  getDataFirebase(){
    // 
    
    this._auth.getPost(this.uuid)
    .subscribe((respData: any) =>{
      
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          
          this.data = f.data();
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

  siguientePestania(){
    if(this.firstFormGroup.invalid){
      return Object.values(this.firstFormGroup.controls).forEach(validator => {
        validator.markAsTouched();
      })
    }
    if(this.firstFormGroup.get('cedula').value.length < 11){
      if(this.validaCedula(this.firstFormGroup.get('cedula').value.trim())){
        this._toast.error('La cédula no es valida ya que no es un formato correcto', 'Error en cedula', {
          closeButton: true,
          easeTime: 700,
          easing: 'ease',
          progressAnimation: 'increasing',
          progressBar: true,
          
        });
      }
    }

  }

  onSubmit(){
    // trear la data del usuario
    // iddoc
    
    
    
    // 
    // 
    
    

    if(this.fourthFormGroup.invalid){
      return Object.values( this.fourthFormGroup.controls ).forEach((validator) =>{
        validator.markAsTouched();
      })
    }
    
    
    if(this.rechazar){
      let enviarFirebase = {
        name:this.firstFormGroup.get('name').value.trim(),
        address:this.firstFormGroup.get('address').value.trim(),
        email:this.firstFormGroup.get('email').value.trim(),
        fono:this.firstFormGroup.get('fono').value.trim(),
        cedula:this.firstFormGroup.get('cedula').value.trim(),
        foto: this.urlFotofirebase === '' ? this.data.foto : '',
        documento: this.documentoPDF === '' ? this.data.documento: '',
        // horas: this.dias,
        // horaDesde: this.horaDesde,
        // horaHasta: this.horaHasta,
        // transporte: this.thirdFormGroup.get('transporte').value,
        // aseo: this.thirdFormGroup.get('aseo').value,
        // alimentacion: this.thirdFormGroup.get('transporte').value,
        // cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
        // cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
        // cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
        // cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
        // cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
        // cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
        // cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
        // cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
        // cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
        // controlesMedicos: this.serviciosMedicos[0].children,
        // serviciosAdicionales: this.serviciosAdicionales,
        // serviciosatencion: this.serviciosatencion[0].children,
        // servicioscomodidad: this.serviciosComodidad[0].children,
        // serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
        // serviciosSanitarios: this.serviciosSanitarios[0].children,
        // mision: this.misionGroup.get('mision').value,
        // vision: this.misionGroup.get('vision').value
      }
      // 
      
      this.postService.updatePost(enviarFirebase, this.idDoc)
      .then((resp) =>{
        
        this.getDataFirebase();

        // this._fotos.insertImages(this.FotoSubir);

      })
    }else{

      

        let enviarFirebase = {
          // ...this.firstFormGroup.value.trim(),
          name:this.firstFormGroup.get('name').value.trim(),
          address:this.firstFormGroup.get('address').value.trim(),
          email:this.firstFormGroup.get('email').value.trim(),
          fono:this.firstFormGroup.get('fono').value.trim(),
          cedula:this.firstFormGroup.get('cedula').value.trim(),
          foto: this.urlFotofirebase,
          documento: this.documentoPDF,
          mensaje: '',
          uid: this.uuid,
          mostrarRegistroAsilo: false,
          rechazar: false,
          confirmacion: true,
          aprobado: false,
          cuentaVerificada:false,
          nomostrarImagen: false,
          correcciones: false,
          // horas: this.dias,
          // horaDesde: this.horaDesde,
          // horaHasta: this.horaHasta,
          // transporte: this.thirdFormGroup.get('transporte').value,
          // aseo: this.thirdFormGroup.get('aseo').value,
          // alimentacion: this.thirdFormGroup.get('transporte').value,
          // cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
          // cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
          // cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
          // cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
          // controlesMedicos: this.serviciosMedicos[0].children,
          // serviciosAdicionales: this.serviciosAdicionales,
          // serviciosatencion: this.serviciosatencion[0].children,
          // servicioscomodidad: this.serviciosComodidad[0].children,
          // serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
          // serviciosSanitarios: this.serviciosSanitarios[0].children,
          // mision: this.misionGroup.get('mision').value,
          // vision: this.misionGroup.get('vision').value
        }
        // 
        
        this.postService.createPosts(enviarFirebase)
        .then((resp) =>{
          
          this.getDataFirebase();
  
          // this._fotos.insertImages(this.FotoSubir);
  
        })
        
    }
    
    
    
    /* if(!this.firstFormGroup.invalid){
      return;
    } */
    // // this.router.navigate(['/home'])
    // alert("registro realizado\muchas gracias ");
  }


  llenadoFormulario(evento: any){
    
    this.getDataFirebase();
    
  }

/* 
  TODO: falta de hacer algo
*/
  // funciona para una imagen
  cambioImagen(evento: any){
    if(evento.target.files.length > 0){

      
      this.FotoSubir = evento.target.files[0];
      const rul =URL.createObjectURL(evento.target.files[0]);
      this.mostrarImagen = (evento.target.files.length > 0) ? this._sanitazer.bypassSecurityTrustUrl(rul): '';
      
      this._fotos.insertImages(this.FotoSubir, this.firstFormGroup.get('name').value.trim())
      .then((resp)=>{
        
        
        resp.ref.getDownloadURL()
        .then((respGet)=>{
          this.urlFotofirebase = respGet;
        })
        .catch((error) =>{
  
        });
      }).catch((error)=>{
  
      });
    }else{
      this._toast.info('La imagen seleccionada ha sido borrada, por favor seleccionar una', 'Subir imagen', {
        closeButton: true,
        easeTime: 4000,
        easing: 'ease',
        progressAnimation: 'decreasing',
        progressBar: true
      })
    }
    
  }


  cambioImagenPdf(evento: any){
    
    this._fotos.insertarPDF(evento.target.files[0])
    .then((respPDF) =>{
      // 
      respPDF.task.then((resp) =>{
        resp.ref.getDownloadURL().then((r) =>{
          

          this.documentoPDF = r;
          
        })
        .catch((err) =>{})
        
      })
      
    })
    .catch((error) =>{
      
      
    })
    
  }

  async cerrar(){
    this._cookie.deleteAll();
    await  this._auth.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true, skipLocationChange: false});
  }

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{1,254}'), Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      fono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
      cedula: ['', [Validators.required, Validators.pattern('[0-9]{10,13}')]]
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
      alimentacion: ['0'],
      aseo: ['0'],
      transporte: ['0'],
      cantidadAseo: [''],
      cantidadServicios: [''],
      cantidadTransporte: [''],
      cantidadAdicionales: [''],
      cantidadSanitarios: [''],
      cantidadTerapeuticos: [''],
      cantidadInstalaciones: [''],
      cantidadAtencion: [''],
      cantidadAlimentacion: ['']
    });

    this.misionGroup = this._fb.group({
      mision: ['', Validators.required],
      vision: ['', Validators.required]
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
    
    
    this.dias.diasSemana.forEach((t) => t.completed = completed);
  }

  actualizarSeleccionados(){
    
    
    this.allComplete = this.dias.diasSemana != null && this.dias.diasSemana.every((t) => t.completed);
  }

  serviciosmedicos(evento: any){
    
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosMedicos.map((t: any) =>{
        // 
        
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosMedicos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
    
  }

  serviciosSanitariosFun(evento: any){
    // 
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosSanitarios.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosSanitarios.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
    
  }
  serviciosTerapeuticosFun(evento: any){
    // 
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosTerapeuticos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosTerapeuticos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
    
  }
  serviciosInstlaciones(evento: any){
    // 
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosComodidad.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosComodidad.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
    
  }
  serviciosAtencion(evento: any){
    // 
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosatencion.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      
    }else{
      this.serviciosatencion.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      
      
    }
    
  }
  
  transporte(evento: any) {
    
  }
  
  serviciosadicionales(evento : any) {
    
    
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      // this.serviciosAdicionales = this.serviciosAdicionales.forEach()
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.serd){
          t.value = true;
        }
        return t;
      })
      
      
      // this.serviciosAdicionalesSelected.push(evento.source.value);
    }else{
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.serd){
          t.value = false;
        }
        return t;
      })
      
      
    }

  }
  cargarinfo(){

    this.postService.getPostByUid(this.uuid)
    .subscribe((resp: any) => {
      
      if(!resp.empty){
        this.comprobarVacio = true;
        for(let f of resp.docs){
          
          this.idDoc = f.id;
          this.data = f.data();
          this._auth.insertName()
          .subscribe((resp) =>{
            this.nombre = resp.displayName;
            this.firstFormGroup.setValue({
              name: f.data().name,
              address: f.data().address,
              email: f.data().email,
              fono: f.data().fono,
              cedula: f.data().cedula
            });
            this.nombre = resp.displayName;
            this.imagen = resp.photoURL;
          });
          this.misionGroup.setValue({
            mision: f.data()?.mision ? f.data()?.mision : '',
            vision: f.data()?.vision ? f.data()?.vision : ''
          })
          
          if(f.data()?.horas){
  
            for(let i = 0; i < this.dias.diasSemana.length; i++){
              this.dias.diasSemana[i].completed = f.data().horas.diasSemana[i].completed;
            }
          }
          
          if(f.data()?.controlesMedicos){
  
            for(let i = 0; i < this.serviciosMedicos[0].children.length; i++){
              this.serviciosMedicos[0].children[i].value = f.data().controlesMedicos[0].children[i].value;
            }
          }
          if(f.data()?.serviciosAdicionales){
  
            for(let i = 0; i < this.serviciosAdicionales.length; i++){
              this.serviciosAdicionales[i].value = f.data().serviciosAdicionales[i].value;
            }
          }
          if(f.data()?.servicioSanitarios){
  
            for(let i = 0; i < this.serviciosSanitarios[0].children.length; i++){
              this.serviciosSanitarios[0].children[i].value = f.data().servicioSanitarios[0].children[i].value;
            }
          }
          if(f.data()?.servisioTerapeuticos){
  
            for(let i = 0; i < this.serviciosTerapeuticos[0].children.length; i++){
              this.serviciosTerapeuticos[0].children[i].value = f.data().servisioTerapeuticos[0].children[i].value;
            }
          }
          if(f.data()?.serviciosComodidad){
  
            for(let i = 0; i < this.serviciosComodidad[0].children.length; i++){
              this.serviciosComodidad[0].children[i].value = f.data().serviciosComodidad[0].children[i].value;
            }
          }
          if(f.data()?.serviciosAtencion){
  
            for(let i = 0; i < this.serviciosatencion[0].children.length; i++){
              this.serviciosatencion[0].children[i].value = f.data().serviciosAtencion[0].children[i].value;
            }
          }
          
          this.horaDesde = f.data()?.horaDesde ?f.data()?.horaDesde : '' ;
          this.horaHasta = f.data()?.horaHasta?f.data()?.horaHasta : '';
         this.mostrarImagen = f.data()?.foto?f.data()?.foto : '';
         this.fourthFormGroup.setValue({
          img: '',
          doc: ''
         });
  
         /* this.cantidadPersonalFormGroup.setValue({
          cantidadAlimentacion: f.data()?.cantidadAlimentacion ? f.data()?.cantidadAlimentacion: '',
          cantidadTransporte: f.data()?.cantidadTransporte ? f.data()?.cantidadTransporte: '',
          cantidadaseo: f.data()?.cantidadaseo ? f.data()?.cantidadaseo: '',
          cmedico: f.data()?.cmedico ? f.data()?.cmedico: '',
          ctera: f.data()?.ctera ? f.data()?.ctera: '',
          csanitario: f.data()?.csanitario ? f.data()?.csanitario: '',
          ccomodidad: f.data()?.ccomodidad ? f.data()?.ccomodidad: '',
          catencion: f.data()?.catencion ? f.data()?.catencion: '',
          ccomplementarios: f.data()?.ccomplementarios ? f.data()?.ccomplementarios: '',
        }) */
         
  
        //  
         
         /* this.fourthFormGroup.setValue({
           alimentacion: f.data().alimentacion,
           aseo: f.data().aseo
         }) */
        }
      }
      
    });
  }

  modificarRegistro(){
    /* his._post.updateModificarRechazar(true, this.idDoc)
    .then((resp) =>{
      this.getDataFirebase();
      this.cargarinfo();
    })
    .catch((erro) => {}); */
  }

  /* validar cedula */

  validaCedula(cedula: string){
    
    
    let cedula_valida = false;
    let total = 0;
    let longitud = cedula.length;
    let longCheck = longitud - 1;
    if(cedula !== "" && longitud === 10){
      // 
      
      for (let index = 0; index < longCheck; index++) {
        if(index%2 === 0){
          let aux = Number.parseInt(cedula.charAt(index)) * 2;
          if(aux > 9) aux = aux - 9;
          total = total + aux;
        }else{
          total = total + Number.parseInt(cedula.charAt(index))
        }
        
      }

      total = total % 10 ? 10 - total % 10 : 0;
      // 
      

      if(Number.parseInt(cedula.charAt(longitud - 1)) === total){
        // 
        
        cedula_valida = false;
      }else{
        // 
        cedula_valida = true;
        
      }
      
    }else if(cedula.length > 10){
      cedula_valida = true;
    }else{
      cedula_valida = true;
    }
    
    
    return cedula_valida;
  }

  verificarCedula(evento: any){
    this.verificarCedulaBool = false;
    if(evento.target.value.trim().length === 10 || evento.target.value.trim().length === 13){
      this._auth.getAllPost()
      .subscribe((resp: any) =>{
        for(let f of resp.docs){
          if(f.data().cedula.trim() === evento.target.value.trim()){
            console.log('es identica');
            this.verificarCedulaBool = true;
            return;
          }else{
            this.verificarCedulaBool = false;
          }
        }
      })
    }
  }


  /* errores */
  get errorCedula(){
    return this.firstFormGroup.get('cedula').hasError('required') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
  }
  get errorCedulaPattern(){
    return this.firstFormGroup.get('cedula').hasError('pattern') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
  }
  get errorNombre(){
    return this.firstFormGroup.get('name').hasError('required') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
  }
  get errorAddress(){
    return this.firstFormGroup.get('address').hasError('required') && (this.firstFormGroup.get('address').touched || this.firstFormGroup.get('address').dirty);
  }
  get errorEmail(){
    return this.firstFormGroup.get('email').hasError('required') && (this.firstFormGroup.get('email').touched || this.firstFormGroup.get('email').dirty);
  }
  get errorEmailPattern(){
    return this.firstFormGroup.get('email').hasError('pattern') && (this.firstFormGroup.get('email').touched || this.firstFormGroup.get('email').dirty);
  }

  get errorFono(){
    return this.firstFormGroup.get('fono').hasError('required') && (this.firstFormGroup.get('fono').touched || this.firstFormGroup.get('fono').dirty);
  }
  get errorFonoPattern(){
    return this.firstFormGroup.get('fono').hasError('pattern') && (this.firstFormGroup.get('fono').touched || this.firstFormGroup.get('fono').dirty);
  }

  /* error img, documento */
  get errorImg(){
    return this.fourthFormGroup.get('img').hasError('required') && (this.fourthFormGroup.get('img').touched || this.fourthFormGroup.get('img').dirty);
  }
  get errorDoc(){
    return this.fourthFormGroup.get('doc').hasError('required') && (this.fourthFormGroup.get('doc').touched || this.fourthFormGroup.get('doc').dirty);
  }

  get errorNamePattern(){
    return this.firstFormGroup.get('name').hasError('pattern') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
    
  }

  get errorDireccionMax(){
    return this.firstFormGroup.get('address').hasError('maxlength') && (this.firstFormGroup.get('address').touched || this.firstFormGroup.get('address').dirty);
  }
  get errorNombreMax(){
    return this.firstFormGroup.get('name').hasError('maxlength') && (this.firstFormGroup.get('name').touched || this.firstFormGroup.get('name').dirty);
  }
}
