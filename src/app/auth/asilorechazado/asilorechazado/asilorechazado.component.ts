// import { AfterViewInit, Component, OnInit } from '@angular/core';

// import { FormBuilder,FormGroup,Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { PostService } from 'src/app/models/post.service';
// // import { AuthService } from '../services/auth.service';

// import { DomSanitizer } from '@angular/platform-browser';

// // import { Post } from '../../models/post.model';
// // import { SubirfotosService } from '../services/subirfotos/subirfotos.service';
// import { ThemePalette } from '@angular/material/core';
// import { AuthService } from '../../services/auth.service';
// import { SubirfotosService } from '../../services/subirfotos/subirfotos.service';

// // uso de interface por obligacion de material design
// export interface diasI {
//   name: string,
//   color: ThemePalette,
//   completed: boolean,
//   diasSemana?: diasI[]
// }

// @Component({
//   selector: 'app-asilorechazado',
//   templateUrl: './asilorechazado.component.html',
//   styleUrls: ['./asilorechazado.component.scss']
// })
// export class AsilorechazadoComponent implements OnInit, AfterViewInit {
//   firstFormGroup: FormGroup;
//   SecondFormGroup: FormGroup;
//   thirdFormGroup: FormGroup;
//   fourthFormGroup: FormGroup;
//   misionGroup: FormGroup;
//   comprobarVacio: boolean =false;
//   nomostrarImagen = false;
// /**swrvicios adicionales*/
// serviciosMedicos: any = [
//   {
//     name: 'Servicios Medicos',
//     children: [
//       {name:'Oxigeno', value: false}, 
//       {name:'Terapias Respiratorias', value: false}, 
//       {name: 'Terapias Musculares', value: false}, 
//       {name: 'Cuidados Postoperatorios', value: false}, 
//       {name: 'Dialisis', value: false}, 
//       {name: 'Sondas', value: false}, 
//       {name: 'Ostomias', value: false}, 
//       {name: 'Terapias Cognitivas', value: false}, 
//       {name: 'Terapias Diabetes', value: false}, 
//     ]
//   }
                            
// ]
// /*------------------------------------------------------*/
// /**swrvicios adicionales*/
// serviciosSanitarios: any = [
//   {
//     name: 'Servicios Sanitarios',
//     children: [
//       {name:'Cuidados de enfermería 24 horas', value: false}, 
//       {name:'Valoración gerontológica', value: false}, 
//       {name: 'Asistencia médica', value: false}, 
//       {name: 'Cuidados continuados para enfermos crónicos', value: false}, 
//       {name: 'Gestión farmacéutica', value: false}, 
//     ]
//   }
                            
// ]
// /*------------------------------------------------------*/
// /**swrvicios adicionales*/
// serviciosTerapeuticos: any = [
//   {
//     name: 'Servicios Terapeuticos',
//     children: [
//       {name:'Programa de estimulación cognitiva', value: false}, 
//       {name:'Programa de estimulación multisensorial', value: false}, 
//       {name: 'Programa de mantenimiento y actividad física', value: false}, 
//       {name: 'Programa de terapia funcional', value: false}, 
//       {name: 'Programa de rehabilitación y fisioterapia', value: false}, 
//       {name: 'Programa de terapia ocupacional para apoyo en las ABIVD´s*', value: false}, 
//       {name: 'Programa de atención centrada en la persona', value: false}, 
//       {name: 'Programa de memoria y reminiscencias', value: false}, 
      
//     ]
//   }
                            
// ]
// /*------------------------------------------------------*/
// /**swrvicios adicionales*/
// serviciosComodidad: any = [
//   {
//     name: 'Servicios Comodidad',
//     children: [
//       {name:'Cocina propia', value: false}, 
//       {name:'Comedor', value: false}, 
//       {name: 'Sala de T.V.', value: false}, 
//       {name: 'Sala de estar', value: false}, 
//       {name: 'Rincones significativos', value: false}, 
//       {name: 'Patio y terrazas', value: false}, 
//       {name: 'Limpieza y lavandería', value: false}, 

//     ]
//   }
                            
// ]
// /*------------------------------------------------------*/
// serviciosatencion: any = [
//   {
//     name: 'Servicios atencion',
//     children: [
//       {name:'Itinerario personalizado', value: false}, 
//       {name:'Plan de atención integral', value: false}, 
//       {name: 'Personal de referencia', value: false}, 
//       {name: 'Proyecto de vida', value: false}, 
//       {name: 'Escuela de familias', value: false}, 
//       {name: 'Grupo de apoyo familiar', value: false}, 
//      ]
//   }
                            
// ]



//   controles: any[] = [
//     {
//       name:'Siquiatria',
//       value: false
//     },
//     {
//       name:'Fisioterapia',
//       value: false
//     },
//     {
//       name:'Sicoterapia',
//       value: false
//     },
//     {
//       name:'Terapia ocupacionales',
//       value: false
//     }
// ];

// transportes: any[] = [
//   {
//     name: 'Si',
//     value: false
//   },
//   {
//     name: 'No',
//     value: false
//   }
// ];
// cantidadAseo: string= ''
// cantidadServicios: string= ''
// cantidadTransporte: string= ''
// cantidadAdicionales: string= ''
// cantidadSanitarios: string= ''
// cantidadTerapeuticos: string= ''
// cantidadInstalaciones: string= ''
// cantidadAtencion: string= ''

// cantidadAlimentacion: string = '';

// serviciosMedicosSelected: any[] = [];
// serviciosAdicionalesSelected: any[] = [];

// serviciosAdicionales: any[] = [
//   {serd:'Peluqueria',value:false},  
//   {serd:'Entrega de Medicamentos',value:false},  
//   {serd:'Acompañamiento a Citas Medicas',value:false},  
//   {serd:'Dieta Especial',value:false},  
//   {serd:'Cama Hospitalaria',value:false},  
//   ]

//   toppings: FormGroup;
//   showFiller = false;
//   public postForm:FormGroup;
//   uuid: string = '';
//   confirmar: boolean = false;
//   rechazar: boolean = false;
//   // modificarRechazar: boolean = false;
//   mostrarFormulario: boolean = false;
//   aprobado: boolean = false;
//   cuentaVerificada:boolean = false;
//   public registroAnterior: any = {};
//   idDoc: string = '';
//   mayus = 'mayus';
//   mostrarImagen: any = '';
//   FotoSubir: File;

//   urlFotofirebase: any = '';
//   rool:string='';
//   nombre: string= '';

//   data: any= {};

//   documentoPDF: string = '';

//   // variables para los checkboxes

//   dias: diasI = {
//     name: 'Todos los dias',
//     completed: false,
//     color: 'primary',
//     diasSemana: [
//       { name: 'Lunes', completed: false, color: 'primary'},
//       { name: 'Martes', completed: false, color: 'primary'},
//       { name: 'Miercoles', completed: false, color: 'primary'},
//       { name: 'Jueves', completed: false, color: 'primary'},
//       { name: 'Viernes', completed: false, color: 'primary'},
//       { name: 'Sabado', completed: false, color: 'primary'},
//       { name: 'Domingo', completed: false, color: 'primary'}
//     ]
//   }
//   allComplete: boolean = false;


//   // ===============================================================
//   // variables para las horas
//   horaDesde: string='';
//   horaHasta: string = '';
//   mensaje: string= '';
  
//   constructor(
//     public postService:PostService,
//     public formBuilder:FormBuilder,
//     public router: Router,
//     private _cookie: CookieService,
//     private _auth: AuthService,
//     private _fotos: SubirfotosService,
//     private _sanitazer: DomSanitizer,
//     private _formBuilder: FormBuilder,
//     private _fb: FormBuilder,
//     private _post: PostService
//   ) {
//     this.postForm= this.formBuilder.group({
//       name:[''],
//       address:[''],
//       email:[''],
//       fono:[''],
//     });
//     this.uuid = this._cookie.get('uid');
//     this.registroAnterior = 'prueba de envio';
//   }

//   async ngOnInit() {
//     this.crearFormulario();
    
//     this.getDataFirebase(); 
//     this.cargarinfo();
//   }
//   ngAfterViewInit(): void {
    
//     this.rool=this._cookie.get('tipo')
//     /* this._auth.traerDataFirebase(this.uuid)
//     .subscribe((respData: any) =>{
//       for(let f of respData.docs){
        
//         
        
       
        
//       }
//     }); */
    
//   }
  
  
 
//   getDataFirebase(){
//     // 
    
//     this._auth.getPost(this.uuid)
//     .subscribe((respData: any) =>{
//       
//       if(respData.docs.length > 0){
//         for(let f of respData.docs){
//           
//           this.data = f.data();
//           this.mostrarFormulario = f.data().mostrarRegistroAsilo;
//           this.confirmar = f.data()?.confirmacion;
//           this.rechazar = f.data().rechazar;
//           this.aprobado = f.data().aprobado;
//           this.nomostrarImagen = f.data().nomostrarImagen;
//           this.registroAnterior = f.data();
//           this.cuentaVerificada=f.data().cuentaVerificada;
//           this.idDoc = f.id;
//           this.mensaje = f.data().mensaje;
//         }
        
//       }
//     });
//   }
//   onSubmit(){
//     // trear la data del usuario
//     // iddoc
//     
//     
//     
//     // 
//     // 
//     
//     
    
//     if(this.rechazar){
//       let enviarFirebase = {
//         ...this.firstFormGroup.value,
//         horas: this.dias,
//         horaDesde: this.horaDesde,
//         horaHasta: this.horaHasta,
//         foto: this.urlFotofirebase === '' ? this.data.foto : '',
//         documento: this.documentoPDF === '' ? this.data.documento: '',
//         transporte: this.thirdFormGroup.get('transporte').value,
//         aseo: this.thirdFormGroup.get('aseo').value,
//         alimentacion: this.thirdFormGroup.get('transporte').value,
//         cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
//         cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
//         cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
//         controlesMedicos: this.serviciosMedicos[0].children,
//         serviciosAdicionales: this.serviciosAdicionales,
//         serviciosatencion: this.serviciosatencion[0].children,
//         servicioscomodidad: this.serviciosComodidad[0].children,
//         serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
//         serviciosSanitarios: this.serviciosSanitarios[0].children,
//         mision: this.misionGroup.get('mision').value,
//         vision: this.misionGroup.get('vision').value
//       }
//       // 
      
//       this.postService.updatePost(enviarFirebase, this.idDoc)
//       .then((resp) =>{
//         
//         this.getDataFirebase();

//         // this._fotos.insertImages(this.FotoSubir);

//       })
//     }else{

//       let enviarFirebase = {
//         ...this.firstFormGroup.value,
//         uid: this.uuid,
//         mostrarRegistroAsilo: false,
//         rechazar: false,
//         confirmacion: true,
//         aprobado: false,
//         cuentaVerificada:false,
//         foto: this.urlFotofirebase,
//         mensaje: '',
//         documento: this.documentoPDF,
//         horas: this.dias,
//         horaDesde: this.horaDesde,
//         horaHasta: this.horaHasta,
//         transporte: this.thirdFormGroup.get('transporte').value,
//         aseo: this.thirdFormGroup.get('aseo').value,
//         alimentacion: this.thirdFormGroup.get('transporte').value,
//         cantidadAlimentacion: this.thirdFormGroup.get('cantidadAlimentacion').value,
//         cantidadAseo: this.thirdFormGroup.get('cantidadAseo').value,
//         cantidadServicios: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadTransporte: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadAdicionales: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadSanitarios: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadTerapeuticos: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadInstalaciones: this.thirdFormGroup.get('cantidadAseo').value, 
//         cantidadAtencion: this.thirdFormGroup.get('cantidadAseo').value, 
//         controlesMedicos: this.serviciosMedicos[0].children,
//         serviciosAdicionales: this.serviciosAdicionales,
//         serviciosatencion: this.serviciosatencion[0].children,
//         servicioscomodidad: this.serviciosComodidad[0].children,
//         serviciosterapeuticos: this.serviciosTerapeuticos[0].children,
//         serviciosSanitarios: this.serviciosSanitarios[0].children,
//         mision: this.misionGroup.get('mision').value,
//         vision: this.misionGroup.get('vision').value
//       }
//       // 
      
//       this.postService.createPosts(enviarFirebase)
//       .then((resp) =>{
//         
//         this.getDataFirebase();

//         // this._fotos.insertImages(this.FotoSubir);

//       })
//     }
    
    
    
//     /* if(!this.firstFormGroup.invalid){
//       return;
//     } */
//     // // this.router.navigate(['/home'])
//     // alert("registro realizado\muchas gracias ");
//   }


//   llenadoFormulario(evento: any){
//     
//     this.getDataFirebase();
    
//   }

// /* 
//   TODO: falta de hacer algo
// */
//   // funciona para una imagen
//   cambioImagen(evento: any){
    
//     
//     this.FotoSubir = evento.target.files[0];
//     const rul =URL.createObjectURL(evento.target.files[0]);
//     this.mostrarImagen = (evento.target.files.length > 0) ? this._sanitazer.bypassSecurityTrustUrl(rul): '';
//     
//     this._fotos.insertImages(this.FotoSubir, this.firstFormGroup.get('name').value)
//     .then((resp)=>{
//       
      
//       resp.ref.getDownloadURL()
//       .then((respGet)=>{
//         this.urlFotofirebase = respGet;
//       })
//       .catch((error) =>{

//       });
//     }).catch((error)=>{

//     });
    
//   }


//   cambioImagenPdf(evento: any){
//     
//     this._fotos.insertarPDF(evento.target.files[0])
//     .then((respPDF) =>{
//       // 
//       respPDF.task.then((resp) =>{
//         resp.ref.getDownloadURL().then((r) =>{
//           

//           this.documentoPDF = r;
          
//         })
//         .catch((err) =>{})
        
//       })
      
//     })
//     .catch((error) =>{
//       
      
//     })
    
//   }

//   async cerrar(){
//     this._cookie.deleteAll();
//     await  this._auth.logout();
//     this.router.navigateByUrl('/login', {replaceUrl: true, skipLocationChange: false});
//   }

//   crearFormulario(){
//     this.firstFormGroup = this._fb.group({
//       name: ['', Validators.required],
//       address: ['', Validators.required],
//       email: ['', Validators.required],
//       fono: ['', Validators.required]
//     });

//     /* this.SecondFormGroup = this._fb.group({
//       lunes: ['', Validators.required],
//       martes: ['', Validators.required],
//       miercoles: ['', Validators.required],
//       jueves: ['', Validators.required],
//       viernes: ['', Validators.required],
//       sabado: ['', Validators.required],
//       domingo: ['', Validators.required]
//     }); */
//     this.fourthFormGroup = this._fb.group({
//       img: ['', Validators.required],
//       doc: ['', Validators.required]
//     });

//     this.thirdFormGroup = this._fb.group({
//       alimentacion: ['0'],
//       aseo: ['0'],
//       transporte: ['0'],
//       cantidadAseo: [''],
//       cantidadServicios: [''],
//       cantidadTransporte: [''],
//       cantidadAdicionales: [''],
//       cantidadSanitarios: [''],
//       cantidadTerapeuticos: [''],
//       cantidadInstalaciones: [''],
//       cantidadAtencion: [''],
//       cantidadAlimentacion: ['']
//     });

//     this.misionGroup = this._fb.group({
//       mision: ['', Validators.required],
//       vision: ['', Validators.required]
//     });

//   }

//   // funcion para seleccionar todas los dias
//   algunasCompletadas():boolean {
//     if(this.dias.diasSemana == null){
//       return false;
//     }
//     return this.dias.diasSemana.filter((t:any) => t.completed).length > 0 && !this.allComplete;
//   }

//   setearTodos(completed: boolean){
//     this.allComplete = completed;
//     this.dias.completed = completed;
//     if(this.dias.diasSemana == null){
//       return;
//     }
//     
    
//     this.dias.diasSemana.forEach((t) => t.completed = completed);
//   }

//   actualizarSeleccionados(){
//     
    
//     this.allComplete = this.dias.diasSemana != null && this.dias.diasSemana.every((t) => t.completed);
//   }

//   serviciosmedicos(evento: any){
//     
    
//     if(evento.checked){
//       // this.serviciosMedicosSelected.push(evento.source.value);
//       this.serviciosMedicos.map((t: any) =>{
//         // 
        
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = true;
//           }
//           return v;
//         })
//       })
//       
//     }else{
//       this.serviciosMedicos.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = false;
//           }
//           return v;
//         })
//       })
//       
      
//     }
    
//   }

//   serviciosSanitariosFun(evento: any){
//     // 
    
//     if(evento.checked){
//       // this.serviciosMedicosSelected.push(evento.source.value);
//       this.serviciosSanitarios.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = true;
//           }
//           return v;
//         })
//       })
//       
//     }else{
//       this.serviciosSanitarios.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = false;
//           }
//           return v;
//         })
//       })
//       
      
//     }
    
//   }
//   serviciosTerapeuticosFun(evento: any){
//     // 
    
//     if(evento.checked){
//       // this.serviciosMedicosSelected.push(evento.source.value);
//       this.serviciosTerapeuticos.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = true;
//           }
//           return v;
//         })
//       })
//       
//     }else{
//       this.serviciosTerapeuticos.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = false;
//           }
//           return v;
//         })
//       })
//       
      
//     }
    
//   }
//   serviciosInstlaciones(evento: any){
//     // 
    
//     if(evento.checked){
//       // this.serviciosMedicosSelected.push(evento.source.value);
//       this.serviciosComodidad.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = true;
//           }
//           return v;
//         })
//       })
//       
//     }else{
//       this.serviciosComodidad.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = false;
//           }
//           return v;
//         })
//       })
//       
      
//     }
    
//   }
//   serviciosAtencion(evento: any){
//     // 
    
//     if(evento.checked){
//       // this.serviciosMedicosSelected.push(evento.source.value);
//       this.serviciosatencion.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = true;
//           }
//           return v;
//         })
//       })
//       
//     }else{
//       this.serviciosatencion.map((t) =>{
//         return t.children.map((v) =>{
//           if(evento.source.value === v.name){
//             v.value = false;
//           }
//           return v;
//         })
//       })
//       
      
//     }
    
//   }
  
//   transporte(evento: any) {
    
//   }
  
//   serviciosadicionales(evento : any) {
//     
//     
    
//     if(evento.checked){
//       // this.serviciosMedicosSelected.push(evento.source.value);
//       // this.serviciosAdicionales = this.serviciosAdicionales.forEach()
//       this.serviciosAdicionales.map((t) =>{
//         if(evento.source.value === t.serd){
//           t.value = true;
//         }
//         return t;
//       })
//       
      
//       // this.serviciosAdicionalesSelected.push(evento.source.value);
//     }else{
//       this.serviciosAdicionales.map((t) =>{
//         if(evento.source.value === t.serd){
//           t.value = false;
//         }
//         return t;
//       })
//       
      
//     }

//   }
//   cargarinfo(){

//     this.postService.getPostByUid(this.uuid)
//     .subscribe((resp: any) => {
//       
//       if(!resp.empty){
//         this.comprobarVacio = true;
//         for(let f of resp.docs){
//           
//           this.idDoc = f.id;
//           this.firstFormGroup.setValue({
//             name: f.data()?.name,
//             address: f.data().address,
//             email: f.data().email,
//             fono: f.data().fono
//           });
//           
//           for(let i = 0; i < this.dias.diasSemana.length; i++){
//             this.dias.diasSemana[i].completed = f.data().horas.diasSemana[i].completed;
//           }
//           
          
//           
//           for(let i = 0; i < this.controles.length; i++){
//             this.controles[i].value = f.data().controlesMedicos[i].value;
//           }
//           for(let i = 0; i < this.serviciosAdicionales.length; i++){
//             this.serviciosAdicionales[i].value = f.data().serviciosAdicionales[i].value;
//           }
          
//           this.horaDesde = f.data().horaDesde;
//           this.horaHasta = f.data().horaHasta;
//          this.mostrarImagen = f.data().foto;
//          this.misionGroup.setValue({
//            mision: this.data.mision,
//            vision:this.data.vision
//          })
//          this.thirdFormGroup.setValue({
//            alimentacion: this.data.alimentacion,
//            aseo: this.data.aseo,
//            transporte: this.data.transporte,
//            cantidadAseo: this.data.cantidadAseo,
//           cantidadServicios: this.data.cantidadServicios,
//           cantidadTransporte: this.data.cantidadTransporte,
//           cantidadAdicionales: this.data.cantidadAdicionales,
//           cantidadSanitarios: this.data.cantidadSanitarios,
//           cantidadTerapeuticos: this.data.cantidadTerapeuticos,
//           cantidadInstalaciones: this.data.cantidadInstalaciones,
//           cantidadAtencion: this.data.cantidadAtencion,
//           cantidadAlimentacion: this.data.cantidadAlimentacion
//          })
//         //  this.transporteSelect = f.data().transporte;
//         //  this.alimentacion = f.data().alimentacion;
//         //  this.aseo = f.data().aseo;
         
  
//          
         
//          /* this.fourthFormGroup.setValue({
//            alimentacion: f.data().alimentacion,
//            aseo: f.data().aseo
//          }) */
//         }
//       }else{
//         this.comprobarVacio = false;
//       }
      
//     });
//   }

  
//   actualizarFotoDoc(){
    
//     let enviar = {
//       foto: this.urlFotofirebase,
//       documento: this.documentoPDF
//     }
//     this._post.updatePost(enviar, this.idDoc)
//     .then((resp) =>{
//       this.getDataFirebase();
//       this.cargarinfo();
//       let afterRechazo = {
//         mostrarRegistroAsilo: false,
//         confirmacion: true,
//         aprobado: false,
//         cuentaVerificada:false,
//         correcciones: false
//       }
//       this._post.updatePostAfterRechazo(afterRechazo, this.idDoc)
//       .then((resp) =>{
//         this.getDataFirebase();
//         // this.cargarinfo();
//       })
//     })
//     .catch((error) =>{
  
//     })
//   }

//   modificarRegistro(){
//     this._post.updateModificarRechazar(true, this.idDoc, false)
//     .then((resp) =>{
//       this.getDataFirebase();
//       // this.cargarinfo();
//     })
//     .catch((erro) => {});
//   }
// }


import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from 'src/app/models/post.service';
// import { AuthService } from '../services/auth.service';

import { DomSanitizer } from '@angular/platform-browser';

// import { Post } from '../../models/post.model';
// import { SubirfotosService } from '../services/subirfotos/subirfotos.service';
import { ThemePalette } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { SubirfotosService } from '../../services/subirfotos/subirfotos.service';
import { ToastrService } from 'ngx-toastr';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { PrimeNGConfig } from 'primeng/api'

// uso de interface por obligacion de material design
export interface diasI {
  name: string,
  color: ThemePalette,
  completed: boolean,
  diasSemana?: diasI[]
}

interface medicosServicios{
  name?: string,
  value?:any,
  children?:medicosServicios[]
}
@Component({
  selector: 'app-asilorechazado',
  templateUrl: './asilorechazado.component.html',
  styleUrls: ['./asilorechazado.component.scss']
})
export class AsilorechazadoComponent implements OnInit, AfterContentInit {
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
  horaDesde: string= '';
  mayorCeroBool: boolean = false;
horaHasta: string= '';
rechazar: boolean = false
uid: string= '';
nombre: string = '';
aprobado: boolean = false;
verificarFalse: boolean= false;
alimentacionBool: boolean = false;
aseoBool: boolean = false;
transporteBool: boolean = false;
serviciosMedicosBool: boolean =false;
serviciosSanitariosBool: boolean =false;
serviciosAtencionBool: boolean =false;
serviciosTerapeuticosBool: boolean =false;
serviciosComodidadBool: boolean =false;
serviciosAdicionalesBool: boolean =false;
serviciosMedicosBool_1: boolean =false;
serviciosSanitariosBool_2: boolean =false;
serviciosAtencionBool_3: boolean =false;
serviciosTerapeuticosBool_4: boolean =false;
serviciosComodidadBool_5: boolean =false;
serviciosAdicionalesBool_6: boolean =false;

dataCantidadPersonal: any = {};
dataComprobarVacio: any = {};

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
serviciosSanitarios: medicosServicios[] = [
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
serviciosTerapeuticos: medicosServicios[] = [
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
serviciosComodidad: medicosServicios[] = [
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
serviciosatencion: medicosServicios[] = [
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
serviciosAdicionales: medicosServicios[] = [
  {name:'Peluqueria',value:false},  
  {name:'Entrega de Medicamentos',value:false},  
  {name:'Acompañamiento a Citas Medicas',value:false},  
  {name:'Dieta Especial',value:false},  
  {name:'Cama Hospitalaria',value:false},  
  ]

  mensajes: any[];

mostrarImagen:any = '';

FotoSubir: any;
mensaje: string = '';

allComplete: boolean = false;
documentoPDF: string = '';
data: any;
confirmar: boolean =false;
registroAnterior: boolean = false;
cuentaVerificada: boolean = false;
urlFotofirebase: any = '';
diasSemanasBool: boolean = false;
dataMostrarMotivoRezchazo: any[] = [];
noMostrarImg: boolean = false;
  
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
  private toastr: ToastrService,
  private primengconfig: PrimeNGConfig
  ) {
  this.uid = this._token.get('uid');
  
}




  
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

  
  // 
  
  this.crearFormulario();
}

ngOnInit(): void {
  this.token = this._cookie.get('uid');
  
  this.getDataFirebase();
  
  this.cargarinfo();
  
  this.primengconfig.ripple = true;
  
}

cargarinfo(){

  this.postService.getPostByUid(this.uid)
  .subscribe((resp: any) => {
    
    
    for(let f of resp.docs){
      
      this.dataMostrarMotivoRezchazo.push(...f.data().motivoRechazo);
      this.mensajes= [{
        severity:'info', summary: 'Info', detail: f.data().mensaje
      }]
      this.idDoc = f.id;
      this._auth.insertName()
      .subscribe((resp) =>{
        this.nombre = resp.displayName;
        this.dataComprobarVacio = f.data();
        this.firstFormGroup.setValue({
          name: f.data().name,
          address: f.data().address,
          email: f.data().email,
          fono: f.data().fono,
          cedula: f.data().cedula
        });
      });
      this.serviciosMedicosBool = (f.data()?.controlesMedicos) ? f.data()?.controlesMedicos[0].children.some( (v) => v.value === false): true;
        this.serviciosTerapeuticosBool = (f.data()?.servisioTerapeuticos) ? f.data()?.servisioTerapeuticos[0].children.some( (v) => v.value === false): true;
        this.serviciosSanitariosBool = (f.data()?.servicioSanitarios)?f.data()?.servicioSanitarios[0].children.some( (v) => v.value === false): true;
        this.serviciosComodidadBool = (f.data()?.serviciosComodidad) ?f.data()?.serviciosComodidad[0].children.some( (v) => v.value === false): true;
        this.serviciosAtencionBool = (f.data()?.serviciosAtencion)?f.data()?.serviciosAtencion[0].children.some( (v) => v.value === false): true;
        this.serviciosAdicionalesBool = (f.data()?.serviciosAdicionales)?f.data()?.serviciosAdicionales.some( (v) => v.value === false): true;
        this.diasSemanasBool = (f.data()?.horas)? f.data()?.horas.diasSemana.some((v) => v.completed == false): true;
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
     

    //  
     
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

  if(this.fourthFormGroup.invalid){
    this.toastr.warning('no se puede actualizar, ya que no ha elegido una foto', 'Error', {
      progressAnimation: 'increasing',
      progressBar: true,
    })
    return Object.values( this.thirdFormGroup.controls ).forEach((validators) =>{
      validators.markAllAsTouched()
    })
  }
  let enviar = {
    foto: this.urlFotofirebase,
    documento: this.documentoPDF,
    mostrarRegistroAsilo: false,
    rechazar: true,
    confirmacion: true,
    aprobado: false,
    cuentaVerificada:false,
    nomostrarImagen: false,
    correcciones: false,
  }
  this._post.updatePost(enviar, this.idDoc)
  .then((resp) =>{
    this.toastr.success("imagen actualizada correctamente", 'Imagen',{
      closeButton: true,
      progressAnimation: 'increasing',
      progressBar: true
    })
    // this.cargtarinfo();
    this.getDataFirebase();
  })
  .catch((error) =>{

  })
}

crearFormulario(){
  this.firstFormGroup = this._fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    email: ['',[ Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
    fono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
    cedula: ['', [Validators.required, Validators.pattern('[0-9]{10,13}')]]
  });

  this.misionGroup = this._fb.group({
    mision: ['', [Validators.required]],
    vision: ['', [Validators.required]]
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
    img:['', Validators.required]
  });

  this.fourthFormGroup = this._fb.group({
    img: ['', Validators.required],
    doc: ['', Validators.required]
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
  
  

 

  if(evento.target.files.length > 0){

    
    this.FotoSubir = evento.target.files[0];
    const rul =URL.createObjectURL(evento.target.files[0]);
    this.mostrarImagen = (evento.target.files.length > 0) ? this._sanitazer.bypassSecurityTrustUrl(rul): '';
    
    this._fotos.insertImages(this.FotoSubir, this.firstFormGroup.get('name').value)
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
    this.toastr.info('La imagen seleccionada ha sido borrada, por favor seleccionar una', 'Subir imagen', {
      closeButton: true,
      easeTime: 400,
      easing: 'ease',
      progressAnimation: 'decreasing',
      progressBar: true
    })
  }
  
  
}


getDataFirebase(){
  // 
  
  this._auth.getPost(this.token)
  .subscribe((respData: any) =>{
    
    if(respData.docs.length > 0){
      for(let f of respData.docs){
        // this.data = f.data();
        // this.mostrarFormulario = f.data().mostrarRegistroAsilo;
        this.confirmar = f.data()?.confirmacion;
        this.rechazar = f.data().rechazar;
        this.aprobado = f.data().aprobado;
        this.registroAnterior = f.data();
        this.cuentaVerificada=f.data().cuentaVerificada;
        this.idDoc = f.id;
        this.mensaje = f.data().mensaje;
        this.mostrarFormulario = f.data().mostrarFormulario;
        this.noMostrarImg= f.data().nomostrarImagen;
      }
      
    }
  });
}

modificarRegistro(){
  this._post.updateModificarRechazar(true, this.idDoc, false)
  .then((resp) =>{
    this.getDataFirebase();
    this.cargarinfo();
  })
  .catch((erro) => {});
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
    
    
    // this.serviciosAdicionalesSelected.push(evento.source.value);
  }else{
    this.serviciosAdicionales.map((t) =>{
      if(evento.source.value === t.name){
        t.value = false;
      }
      return t;
    })
    
    
  }
}



actualizar(evento: any){
  
  
  
  

  if(this.firstFormGroup.invalid){
    return Object.values( this.firstFormGroup.controls ).forEach(validator =>{
      validator.markAllAsTouched();
    });
  }

  this._post.updatePost(this.firstFormGroup.getRawValue(), this.idDoc)
  .then((resp) =>{
    
    this.toastr.success('datos actualizados', 'Actualizados', {
      progressAnimation: 'decreasing',
      progressBar: true,
      closeButton: true,
    })
    this.cargarinfo();
  })
  .catch((error) =>{
    
    
  })
  
} 

actualizarHorarios(){
  
  
  
  this.verificarFalse = this.dias.diasSemana.every(v => v.completed === false);
  
  
  if(!this.verificarFalse && (this.horaDesde !== '' || this.horaHasta !== '')){
    let enviar = {
      horas: this.dias,
      horaDesde: this.horaDesde,
      horaHasta: this.horaHasta,
    }
    this._post.updatePost(enviar, this.idDoc)
    .then((resp) =>{
      this.toastr.success('Información actualizada', 'Horarios de atención',{
        progressAnimation: 'decreasing',
        progressBar: true,
        closeButton: true,
        easeTime: 200,
        easing: 'ease-out',
      });
      this.cargarinfo();
    })
    .catch((error) =>{
      this.toastr.error('Error al actualizar la información', 'Error Horarios de atención',{
        progressAnimation: 'decreasing',
        progressBar: true,
        closeButton: true,
        easeTime: 200,
        easing: 'ease-out',
      });

    })
  }
  
}


actualizarServicios(){
  
  
  

  if(this.fourthFormGroup.invalid){
    return Object.values( this.fourthFormGroup.controls ).forEach((validator) =>{
      validator.markAllAsTouched()
    });
  }
  
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
    
    this.toastr.success('Servicios actualizados correctamente.', 'Modificar servicios', {
      progressAnimation: 'increasing',
      progressBar: true,
    })
    this.cargarinfo();
  })
  .catch((error) =>{
    
    
  })
}


prueba(evento: any){
  
  
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

misionvision(){

  if(this.misionGroup.invalid){
    return Object.values(this.misionGroup.controls).forEach(validator => {
      validator.markAsTouched();
    })
  }
  this._post.updatePost(this.misionGroup.getRawValue(), this.idDoc)
  .then((resp)=>{
    this.toastr.success('Datos actualizados correctamente', 'Actualizar', {
      progressAnimation: 'increasing',
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      tapToDismiss: true,
      timeOut: 3000,
      
    })
  })
  .catch()
}


cantidadPersonal(){
  
  if(this.cantidadPersonalFormGroup.invalid){
    return Object.values( this.cantidadPersonalFormGroup.controls ).forEach((validators) =>{
      validators.markAllAsTouched()
    });
  }
  
  let enviar = {};

  if(this.dataCantidadPersonal.alimentacion !== 'no'){
    enviar = {
      ...enviar,
      cantidadAlimentacion: this.cantidadPersonalFormGroup.get('cantidadAlimentacion').value,
    }
  }else{
    enviar = {
      ...enviar,
      cantidadAlimentacion: 0,
    }
    
  }
  if(this.dataCantidadPersonal.transporte !== 'No'){
    enviar = {
      ...enviar,
      cantidadTransporte: this.cantidadPersonalFormGroup.get('cantidadTransporte').value,
    }
  }else{
    enviar = {
      ...enviar,
      cantidadTransporte:0
    }

  }
  if(this.dataCantidadPersonal.aseo !== 'no'){
    enviar = {
      ...enviar,
      cantidadaseo: this.cantidadPersonalFormGroup.get('cantidadaseo').value
    }
  }else{
    enviar = {
      ...enviar,
      cantidadaseo: 0
    }

  }
  
  if(this.serviciosMedicosBool){
    enviar = {
      ...enviar,
      cmedico: this.cantidadPersonalFormGroup.get('cmedico').value
    }
    
  }else{
    
    enviar = {
      ...enviar,
      cmedico: 0
    }
  }
  if(this.serviciosTerapeuticosBool){
    enviar = {
      ...enviar,
      ctera: this.cantidadPersonalFormGroup.get('ctera').value
    }
    
  }else{
    enviar = {
      ...enviar,
      ctera:0
    }

  }
  if(this.serviciosSanitariosBool){
    enviar = {
      ...enviar,
      csanitario: this.cantidadPersonalFormGroup.get('csanitario').value
    }
    
  }else{
    enviar = {
      ...enviar,
      csanitario: 0
    }

  }

  if(this.serviciosComodidadBool){
    enviar = {
      ...enviar,
      ccomodidad: this.cantidadPersonalFormGroup.get('ccomodidad').value
    }
    
  }else{
    enviar = {
      ...enviar,
      ccomodidad: 0
    }

  }
  if(this.serviciosAtencionBool){
    enviar = {
      ...enviar,
      catencion: this.cantidadPersonalFormGroup.get('catencion').value
    }
    
  }else{
    
    enviar = {
      ...enviar,
      catencion:0
    }
  }
  if(this.serviciosAdicionalesBool){
    
    enviar = {
      ...enviar,
      ccomplementarios: this.cantidadPersonalFormGroup.get('ccomplementarios').value
    }
  }else{
    enviar = {
      ...enviar,
      ccomplementarios: 0
    }
    
  }
  
  
  this._post.updatePost(enviar, this.idDoc)
  .then((resp)=>{
    this.toastr.success('Datos Guardados', 'Guardando');
    this.postService.getPostByUid(this.uid)
    .subscribe((resp: any) => {
      
      
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
  .catch()
}

cambioValorAlimentacion(evento: any){
  
  if(evento === '0'){
    this.alimentacionBool = true;
  }else{
    
    this.alimentacionBool = false;
  }
  
}
cambioValorAseo(evento: any){
  
  if(evento === '0'){
    this.aseoBool = true;
  }else{
    this.aseoBool = false;

  }

}
transporte(evento: any){
  
  if(evento === '0'){
    this.transporteBool = true;
  }else{
    this.transporteBool = false;
    
  }

}

cambioStep(stepper: any){
  
  if((stepper.steps.length - 1) === 4){
    this._post.getPostByUid(this.uid)
    .subscribe((resp: any) =>{
      
      for(let f of resp.docs){
        this.dataCantidadPersonal = f.data();
        

        this.serviciosMedicosBool_1 = f.data().controlesMedicos[0].children.some( (v) => v.value === true);
        this.serviciosTerapeuticosBool_4 = f.data().servisioTerapeuticos[0].children.some( (v) => v.value === true);
        this.serviciosSanitariosBool_2 = f.data().servicioSanitarios[0].children.some( (v) => v.value === true);
        this.serviciosComodidadBool_5 = f.data().serviciosComodidad[0].children.some( (v) => v.value === true);
        this.serviciosAtencionBool_3 = f.data().serviciosAtencion[0].children.some( (v) => v.value === true);
        this.serviciosAdicionalesBool_6 = f.data().serviciosAdicionales.some( (v) => v.value === true);
        
      }
    })
  }
  
}



hasChild = (_: number, node: medicosServicios)      => node.children && node.children.length > 0;
hasChildAdi = (_: number, node: medicosServicios)   => node.children && node.children.length > 0;
hasChildSani = (_: number, node: medicosServicios)  => node.children && node.children.length > 0;
hasChildComo = (_: number, node: medicosServicios)  => node.children && node.children.length > 0;
hasChildTera = (_: number, node: medicosServicios)  => node.children && node.children.length > 0;
hasChildAte = (_: number, node: medicosServicios)   => node.children && node.children.length > 0;


get errorMision(){
  return this.misionGroup.get('mision').hasError('required') && (this.misionGroup.get('mision').touched || this.misionGroup.get('mision').touched);
}

get errorVision(){
  return this.misionGroup.get('vision').hasError('required') && (this.misionGroup.get('vision').touched || this.misionGroup.get('vision').touched);
}


/* error datos personaes */

get errorCedula(){
  return this.firstFormGroup.get('cedula').hasError('required') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
}
get errorCedulaMin(){
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

get errorImg(){
  return this.thirdFormGroup.get('img').hasError('required') && (this.thirdFormGroup.get('img').touched || this.thirdFormGroup.get('img').dirty)
}


get errorCantidadAlimentacion(){
  return (this.cantidadPersonalFormGroup.get('cantidadAlimentacion').value === "" || this.cantidadPersonalFormGroup.get('cantidadAlimentacion').value === 0) && ( this.cantidadPersonalFormGroup.get('cantidadAlimentacion').touched ||this.cantidadPersonalFormGroup.get('cantidadAlimentacion').dirty )
}
get errorCantidadTransporte(){
  return (this.cantidadPersonalFormGroup.get('cantidadTransporte').value === "" || this.cantidadPersonalFormGroup.get('cantidadTransporte').value === 0) && ( this.cantidadPersonalFormGroup.get('cantidadTransporte').touched ||this.cantidadPersonalFormGroup.get('cantidadTransporte').dirty )
}
get errorCantidadAseo(){
  return (this.cantidadPersonalFormGroup.get('cantidadaseo').value === "" || this.cantidadPersonalFormGroup.get('cantidadaseo').value === 0) && ( this.cantidadPersonalFormGroup.get('cantidadaseo').touched ||this.cantidadPersonalFormGroup.get('cantidadaseo').dirty )
}
get errorCantidadMedico(){
  return (this.cantidadPersonalFormGroup.get('cmedico').value === "" || this.cantidadPersonalFormGroup.get('cmedico').value === 0) && ( this.cantidadPersonalFormGroup.get('cmedico').touched ||this.cantidadPersonalFormGroup.get('cmedico').dirty )
}
get errorCantidadTera(){
  return (this.cantidadPersonalFormGroup.get('ctera').value === "" || this.cantidadPersonalFormGroup.get('ctera').value === 0) && ( this.cantidadPersonalFormGroup.get('ctera').touched ||this.cantidadPersonalFormGroup.get('ctera').dirty )
}
get errorCantidadSanitario(){
  return (this.cantidadPersonalFormGroup.get('csanitario').value === "" || this.cantidadPersonalFormGroup.get('csanitario').value === 0) && ( this.cantidadPersonalFormGroup.get('csanitario').touched ||this.cantidadPersonalFormGroup.get('csanitario').dirty )
}
get errorCantidadComodidad(){
  return (this.cantidadPersonalFormGroup.get('ccomodidad').value === "" || this.cantidadPersonalFormGroup.get('ccomodidad').value === 0) && ( this.cantidadPersonalFormGroup.get('ccomodidad').touched ||this.cantidadPersonalFormGroup.get('ccomodidad').dirty )
}
get errorCantidadAtencion(){
  return (this.cantidadPersonalFormGroup.get('catencion').value === "" || this.cantidadPersonalFormGroup.get('catencion').value === 0) && ( this.cantidadPersonalFormGroup.get('catencion').touched ||this.cantidadPersonalFormGroup.get('catencion').dirty )
}
get errorCantidadAdicionales(){
  return (this.cantidadPersonalFormGroup.get('ccomplementarios').value === "" || this.cantidadPersonalFormGroup.get('ccomplementarios').value === 0) && ( this.cantidadPersonalFormGroup.get('ccomplementarios').touched ||this.cantidadPersonalFormGroup.get('ccomplementarios').dirty )
}
get errorDoc(){
  return this.fourthFormGroup.get('doc').hasError('required') && (this.fourthFormGroup.get('doc').touched || this.fourthFormGroup.get('doc').dirty);
}
siguientePestania(){

}

get errorCedulaPattern(){
  return this.firstFormGroup.get('cedula').hasError('pattern') && (this.firstFormGroup.get('cedula').touched || this.firstFormGroup.get('cedula').dirty);
}

}
