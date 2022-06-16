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
  misionGroup: FormGroup;
  comprobarVacio: boolean =false;
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
    private _post: PostService
  ) {
    this.postForm= this.formBuilder.group({
      name:['',Validators.required],
      address:['',Validators.required],
      email:['',Validators.required],
      fono:['',Validators.required],
    });
    this.uuid = this._cookie.get('uid');
    this.registroAnterior = 'prueba de envio';
  }

  async ngOnInit() {
    this._auth.insertName()
    .subscribe((resp) =>{
      this.nombre = resp.displayName
    })
    this.crearFormulario();
    
    this.getDataFirebase(); 
    this.cargarinfo();
  }
  ngAfterViewInit(): void {
    
    this.rool=this._cookie.get('tipo')
    /* this._auth.traerDataFirebase(this.uuid)
    .subscribe((respData: any) =>{
      for(let f of respData.docs){
        
        console.log(f.data());
        
       
        
      }
    }); */
    
  }
  
  
 
  getDataFirebase(){
    // console.log(this.re);
    
    this._auth.getPost(this.uuid)
    .subscribe((respData: any) =>{
      console.log(respData);
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          console.log(f.data());
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
    
    if(this.rechazar){
      let enviarFirebase = {
        ...this.firstFormGroup.value,
        horas: this.dias,
        horaDesde: this.horaDesde,
        horaHasta: this.horaHasta,
        foto: this.urlFotofirebase === '' ? this.data.foto : '',
        documento: this.documentoPDF === '' ? this.data.documento: '',
        transporte: this.thirdFormGroup.get('transporte').value,
        aseo: this.thirdFormGroup.get('aseo').value,
        alimentacion: this.thirdFormGroup.get('transporte').value,
        cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
        cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
        cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
        controlesMedicos: this.serviciosMedicos[0].children,
        serviciosAdicionales: this.serviciosAdicionales,
        serviciosatencion: this.serviciosatencion[0].children,
        servicioscomodidad: this.serviciosComodidad[0].children,
        serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
        serviciosSanitarios: this.serviciosSanitarios[0].children,
        mision: this.misionGroup.get('mision').value,
        vision: this.misionGroup.get('vision').value
      }
      // console.log(enviarFirebase);
      
      this.postService.updatePost(enviarFirebase, this.idDoc)
      .then((resp) =>{
        console.log('se registro correctamente' ,resp);
        this.getDataFirebase();

        // this._fotos.insertImages(this.FotoSubir);

      })
    }else{

      let enviarFirebase = {
        ...this.firstFormGroup.value,
        uid: this.uuid,
        mostrarRegistroAsilo: false,
        rechazar: false,
        confirmacion: true,
        aprobado: false,
        cuentaVerificada:false,
        nomostrarImagen: false,
        correcciones: false,
        foto: this.urlFotofirebase,
        mensaje: '',
        documento: this.documentoPDF,
        horas: this.dias,
        horaDesde: this.horaDesde,
        horaHasta: this.horaHasta,
        transporte: this.thirdFormGroup.get('transporte').value,
        aseo: this.thirdFormGroup.get('aseo').value,
        alimentacion: this.thirdFormGroup.get('transporte').value,
        cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
        cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
        cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
        cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
        controlesMedicos: this.serviciosMedicos[0].children,
        serviciosAdicionales: this.serviciosAdicionales,
        serviciosatencion: this.serviciosatencion[0].children,
        servicioscomodidad: this.serviciosComodidad[0].children,
        serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
        serviciosSanitarios: this.serviciosSanitarios[0].children,
        mision: this.misionGroup.get('mision').value,
        vision: this.misionGroup.get('vision').value
      }
      // console.log(enviarFirebase);
      
      this.postService.createPosts(enviarFirebase)
      .then((resp) =>{
        console.log('se registro correctamente' ,resp);
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
    console.log(this.dias);
    
    this.dias.diasSemana.forEach((t) => t.completed = completed);
  }

  actualizarSeleccionados(){
    console.log(this.dias);
    
    this.allComplete = this.dias.diasSemana != null && this.dias.diasSemana.every((t) => t.completed);
  }

  serviciosmedicos(evento: any){
    console.log(evento);
    
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      this.serviciosMedicos.map((t: any) =>{
        // console.log(t);
        
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = true;
          }
          return v;
        })
      })
      console.log(this.serviciosMedicos);
    }else{
      this.serviciosMedicos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      console.log(this.serviciosMedicos);
      
    }
    
  }

  serviciosSanitariosFun(evento: any){
    // console.log(evento);
    
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
      console.log(this.serviciosSanitarios);
    }else{
      this.serviciosSanitarios.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      console.log(this.serviciosSanitarios);
      
    }
    
  }
  serviciosTerapeuticosFun(evento: any){
    // console.log(evento);
    
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
      console.log(this.serviciosTerapeuticos);
    }else{
      this.serviciosTerapeuticos.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      console.log(this.serviciosTerapeuticos);
      
    }
    
  }
  serviciosInstlaciones(evento: any){
    // console.log(evento);
    
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
      console.log(this.serviciosComodidad);
    }else{
      this.serviciosComodidad.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      console.log(this.serviciosComodidad);
      
    }
    
  }
  serviciosAtencion(evento: any){
    // console.log(evento);
    
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
      console.log(this.serviciosatencion);
    }else{
      this.serviciosatencion.map((t) =>{
        return t.children.map((v) =>{
          if(evento.source.value === v.name){
            v.value = false;
          }
          return v;
        })
      })
      console.log(this.serviciosatencion);
      
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
  cargarinfo(){

    this.postService.getPostByUid(this.uuid)
    .subscribe((resp: any) => {
      console.log(resp);
      if(!resp.empty){
        this.comprobarVacio = true;
        for(let f of resp.docs){
          console.log(f.data());
          this.idDoc = f.id;
          this.firstFormGroup.setValue({
            name: f.data()?.name,
            address: f.data().address,
            email: f.data().email,
            fono: f.data().fono
          });
          console.log(this.dias);
          for(let i = 0; i < this.dias.diasSemana.length; i++){
            this.dias.diasSemana[i].completed = f.data().horas.diasSemana[i].completed;
          }
          console.log(this.dias);
          
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
         this.misionGroup.setValue({
           mision: this.data.mision,
           vision:this.data.vision
         })
         this.thirdFormGroup.setValue({
           alimentacion: this.data.alimentacion,
           aseo: this.data.aseo,
           transporte: this.data.transporte,
           cantidadAseo: this.data.cantidadAseo,
          cantidadServicios: this.data.cantidadServicios,
          cantidadTransporte: this.data.cantidadTransporte,
          cantidadAdicionales: this.data.cantidadAdicionales,
          cantidadSanitarios: this.data.cantidadSanitarios,
          cantidadTerapeuticos: this.data.cantidadTerapeuticos,
          cantidadInstalaciones: this.data.cantidadInstalaciones,
          cantidadAtencion: this.data.cantidadAtencion,
          cantidadAlimentacion: this.data.cantidadAlimentacion
         })
        //  this.transporteSelect = f.data().transporte;
        //  this.alimentacion = f.data().alimentacion;
        //  this.aseo = f.data().aseo;
         
  
         console.log(this.controles);
         
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
}
