import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { PostService } from 'src/app/models/post.service';
import { AuthService } from '../../services/auth.service';
import { SubirfotosService } from '../../services/subirfotos/subirfotos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface medicosServicios{
  name: string,
  value?:any,
  children?:medicosServicios[]
}

@Component({
  selector: 'app-givepass',
  templateUrl: './givepass.component.html',
  styleUrls: ['./givepass.component.scss']
})
export class GivepassComponent implements OnInit, AfterContentInit {
  firstFormGroup: FormGroup;
  SecondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  misionGroup: FormGroup;
  cantidadPersonalFormGroup: FormGroup;
  token: string = '';
  alimentacion: string = '';
  mostrarFormulario: boolean = true;
  aseo: string= '';
  transporteSelect: string= '';
  idDoc: string = '';
  horaDesde: string= ''
horaHasta: string= ''
uid: string= '';
nombre: string = '';
aprobado: boolean = false;

/**
 * MAT TREE servicios medicos
 * **/
treeControl  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSource = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE serviciosadicionales
 * **/
treeControlAdi  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourceAdi = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios sanitarios
 * **/
treeControlSanitarios  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourceSanitarios = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios terapeutirocs
 * **/
treeControltera  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourcetera = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios comodidad
 * **/
treeControlcomodidad  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourcecomodidad = new MatTreeNestedDataSource<medicosServicios>();
/**
 * MAT TREE servicios atencion
 * **/
treeControlAtencion  = new NestedTreeControl<medicosServicios>(node => node.children);
dataSourceAtencion = new MatTreeNestedDataSource<medicosServicios>();

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

serviciosMedicos: medicosServicios[] =
  [{
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
  }]
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
serviciosAdicionales: any[] = [
  {name:'Peluqueria',value:false},  
  {name:'Entrega de Medicamentos',value:false},  
  {name:'Acompañamiento a Citas Medicas',value:false},  
  {name:'Dieta Especial',value:false},  
  {name:'Cama Hospitalaria',value:false},  
  ]


mostrarImagen:any = '';

FotoSubir: any;

allComplete: boolean = false;

urlFotofirebase: any = '';


  constructor(
    private _fb: FormBuilder, 
    private postService: PostService, 
    private _token: CookieService,  
    public router: Router,
    private _cookie: CookieService,
    private _auth: AuthService,
    private _post: PostService,
    private _fotos: SubirfotosService,
    private _sanitazer: DomSanitizer,
    private toastr: ToastrService
    ) {
    this.uid = this._token.get('uid');
  }
  
  
  
  hasChild = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
  hasChildAdi = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
  hasChildSani = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
  hasChildComo = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
  hasChildTera = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
  hasChildAte = (_: number, node: medicosServicios) => node.children && node.children.length > 0;
    
  ngAfterContentInit(): void {
    let adicionales: medicosServicios[] = [
      {
        name: 'Servicios Medicos',
        children: this.serviciosMedicos[0].children
      }
    ];
    let adicionaAdi = [
      {
        name: 'Serivicios Adicionales',
        children: this.serviciosAdicionales
      }
    ]
    
    this.dataSource.data = adicionales;
    this.dataSourceAdi.data= adicionaAdi;
    this.dataSourceAtencion.data = this.serviciosatencion;
    this.dataSourceSanitarios.data = this.serviciosSanitarios;
    this.dataSourcecomodidad.data = this.serviciosComodidad;
    this.dataSourcetera.data = this.serviciosTerapeuticos;

    console.log(this.dataSource);
    
  }
  
  ngOnInit(): void {
    this.token = this._cookie.get('uid');
    

    this.getDataFirebase();
    this.crearFormulario();
    this.cargarinfo();
    this._auth.insertName()
    .subscribe((resp) =>{
      this.nombre = resp.displayName;
    });

    
  }

  cargarinfo(){

    this.postService.getPostByUid(this.uid)
    .subscribe((resp: any) => {
      console.log(resp);
      
      for(let f of resp.docs){
        console.log(f.data());
        this.idDoc = f.id;
        this.firstFormGroup.setValue({
          name: f.data()?.name,
          address: f.data().address,
          email: f.data().email,
          fono: f.data().fono,
          cedula: f.data().cedula
        });
        this.misionGroup.setValue({
          mision: f.data()?.mision ? f.data()?.mision : '',
          vision: f.data()?.vision ? f.data()?.vision : ''
        })
        console.log(this.dias);
        if(f.data()?.horas){

          for(let i = 0; i < this.dias.diasSemana.length; i++){
            this.dias.diasSemana[i].completed = f.data().horas[i].completed;
          }
        }
        console.log(this.dias);
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
        alimentacion: f.data()?.alimentacion ? f.data()?.alimentacion : '',
        transporte: f.data()?.transporte ?f.data()?.transporte : '', 
        aseo: f.data()?.aseo ?f.data()?.aseo : '' 
       });

       this.cantidadPersonalFormGroup.setValue({
        cantidadAlimentacion: f.data()?.cantidadAlimentacion ? f.data()?.cantidadAlimentacion: '',
        cantidadTransporte: f.data()?.cantidadTransporte ? f.data()?.cantidadTransporte: '',
        cantidadaseo: f.data()?.cantidadaseo ? f.data()?.cantidadaseo: '',
        cmedico: f.data()?.cmedico ? f.data()?.cmedico: '',
        ctera: f.data()?.ctera ? f.data()?.ctera: '',
        csanitario: f.data()?.csanitario ? f.data()?.csanitario: '',
        ccomodidad: f.data()?.ccomodidad ? f.data()?.ccomodidad: '',
        catencion: f.data()?.catencion ? f.data()?.catencion: '',
        ccomplementarios: f.data()?.ccomplementarios ? f.data()?.ccomplementarios: '',
      })
       

      //  console.log(this.controles);
       
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

  onSubmit(){
    let enviar = {
      foto: this.urlFotofirebase
    }
    this._post.updatePost(enviar, this.idDoc)
    .then((resp) =>{
      this.cargarinfo();
    })
    .catch((error) =>{

    })
  }

  crearFormulario(){
    this.firstFormGroup = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      fono: ['', Validators.required],
      cedula: ['', Validators.required]
    });

    this.misionGroup = this._fb.group({
      mision: [''],
      vision: ['']
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
      transporte: ['']

    });

    this.cantidadPersonalFormGroup = this._fb.group({
      cantidadAlimentacion: [''],
      cantidadTransporte: [''],
      cantidadaseo: [''],
      cmedico: [''],
      ctera: [''],
      csanitario: [''],
      ccomodidad: [''],
      catencion: [''],
      ccomplementarios: ['']

    })


  }

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


  getDataFirebase(){
    // console.log(this.re);
    
    this._auth.getPost(this.token)
    .subscribe((respData: any) =>{
      console.log(respData);
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          this.aprobado = f.data().aprobado;
          console.log(f.data());
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
        }
        
      }
    });
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
    console.log(evento);
    console.log(this.controles);
    
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

  serviciosadicionales(evento: any){
    if(evento.checked){
      // this.serviciosMedicosSelected.push(evento.source.value);
      // this.serviciosAdicionales = this.serviciosAdicionales.forEach()
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.name){
          t.value = true;
        }
        return t;
      })
      console.log(this.serviciosAdicionales);
      
      // this.serviciosAdicionalesSelected.push(evento.source.value);
    }else{
      this.serviciosAdicionales.map((t) =>{
        if(evento.source.value === t.name){
          t.value = false;
        }
        return t;
      })
      console.log(this.serviciosAdicionales);
      
    }
  }

  transporte(evento: any){

  }

  actualizar(evento: any){
    console.log(evento);
    console.log(this.idDoc);
    
    console.log(this.firstFormGroup.getRawValue());

    this._post.updatePost(this.firstFormGroup.getRawValue(), this.idDoc)
    .then((resp) =>{
      console.log(resp);
      this.cargarinfo();
    })
    .catch((error) =>{
      console.log(error);
      
    })
    
  } 

  actualizarHorarios(){
    console.log(this.dias);
    console.log(this.horaDesde);
    console.log(this.horaHasta);
    let enviar = {
      horas: this.dias.diasSemana.filter((t) => t.completed || !t.completed),
      horaDesde: this.horaDesde,
      horaHasta: this.horaHasta,
    }
    this._post.updatePost(enviar, this.idDoc)
    .then((resp) =>{
      this.cargarinfo();
    })
    .catch((error) =>{

    })
    
  }
  
  
  actualizarServicios(){
    console.log(this.controles);
    console.log(this.serviciosAdicionales);
    console.log(this.idDoc);
    
    let enviar = {
      transporte: this.fourthFormGroup.get('transporte').value,
      aseo: this.fourthFormGroup.get('aseo').value,
      alimentacion: this.fourthFormGroup.get('alimentacion').value,
      controlesMedicos: this.serviciosMedicos,
      serviciosAdicionales: this.serviciosAdicionales,
      servicioSanitarios: this.serviciosSanitarios,
      servisioTerapeuticos: this.serviciosTerapeuticos,
      serviciosAtencion: this.serviciosatencion,
      serviciosComodidad: this.serviciosComodidad,

    }

    this._post.updatePost(enviar, this.idDoc)
    .then((resp) =>{
      console.log(resp);
      this.cargarinfo();
    })
    .catch((error) =>{
      console.log(error);
      
    })
  }


  prueba(evento: any){
    console.log(evento);
    
  }

  serviciosAtencion(evento: any){
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
  serviciosTerapeuticosFun(evento: any){
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
  serviciosSanitariosFun(evento: any){
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

  misionvision(){
    this._post.updatePost(this.misionGroup.getRawValue(), this.idDoc)
    .then((resp)=>{

    })
    .catch(console.log);
  }


  cantidadPersonal(){
    console.log(this.cantidadPersonalFormGroup.getRawValue());
    
    this._post.updatePost(this.cantidadPersonalFormGroup.getRawValue(), this.idDoc)
    .then((resp)=>{
      this.toastr.success('Datos Guardados', 'Guardando');
      this.postService.getPostByUid(this.uid)
      .subscribe((resp: any) => {
        console.log(resp);
        
        for(let f of resp.docs){
          this.cantidadPersonalFormGroup.setValue({
            cantidadAlimentacion: f.data().cantidadAlimentacion,
            cantidadTransporte: f.data().cantidadTransporte,
            cantidadaseo: f.data().cantidadaseo,
            cmedico: f.data().cmedico,
            ctera: f.data().ctera,
            csanitario: f.data().csanitario,
            ccomodidad: f.data().ccomodidad,
            catencion: f.data().catencion,
            ccomplementarios: f.data().ccomplementarios
          })
        }
      })
    })
    .catch(console.log);
  }
  

}
