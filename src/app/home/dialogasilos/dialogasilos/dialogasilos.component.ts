import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageasiloComponent } from 'src/app/auth/messages/messageasilo/messageasilo.component';
import { PostService } from 'src/app/models/post.service';

declare var L: any;

@Component({
  selector: 'app-dialogasilos',
  templateUrl: './dialogasilos.component.html',
  styleUrls: ['./dialogasilos.component.scss']
})
export class DialogasilosComponent implements OnInit, OnDestroy {
  @ViewChild('asilomessage') asilomensajes: MessageasiloComponent;
  @ViewChild('mapa') mapElement: ElementRef;
  posts: any = {};
  uid: string= '';
  fecha = new Date().getFullYear();
  serviciosMedicos: boolean = false;
  serviciosSanitarios: boolean = false;
  serviciosAtencion: boolean = false;
  serviciosTerapeuticos: boolean = false;
  serviciosAdicionales: boolean = false;
  serviciosInstalaciones: boolean = false;
  mostrarBox: boolean = false;
  marcadores: any[]= [];
  // serviciosMedicos: boolean = false;
  optionsMapa: any;
  infoWindow: any;
  map:any;
  constructor(
    private _post: PostService,
    private _activated: ActivatedRoute,
    private _router: Router,
    
  ) { 
    this.uid = this._activated.snapshot.paramMap.get('uid');
    
  }

  ngOnInit(): void {
      console.log();
      
    this.getPosts();
    window.location.replace(`info-asilo/${ this.uid }#inicio`);
  }

  getPosts(){
    this._post.getPostByUid(this.uid)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.posts = [];
      for(let f of resp.docs){
        console.log(f.data());
        this.posts = f.data();
        this.mapa(f.data().latlong.latitude, f.data().latlong.longitude);
        this.agregarMarcador();
        // if(f.data().tipo != ' admin'){
        //   this.posts.push(f.data());
        // }
      }
      console.log(this.posts.latlong.latitude);
      
    })
  }

  agregarMarcador(){
    let popup:any;
    const html = `
        
        <b><h5><b>${ this.posts.name }</b></h5></b>
        <span>${ this.posts.address }</span><br/>
        `;
        let marker = L.marker([this.posts.latlong.latitude, this.posts.latlong.longitude])
                .addTo(this.map);
                
        this.marcadores.push(marker);
                
        marker.on('click', () => {
          popup = L.popup()
          .setLatLng([this.posts.latlong.latitude, this.posts.latlong.longitude])
          .setContent(html)
          .openOn(this.map);
        });
  }

  navegarSeccion(fragment: string){
    // this._router.navigateByUrl(`info-asilo/${ this.uid }#` + fragment);
    window.location.replace(`info-asilo/${ this.uid }#` + fragment);
  }

  mapa(latitude: number, longitude: number){
    // await loading.present();
    this.map = L.map('mapa', {center: [latitude, longitude], zoom:12});
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoidHlzb24yMSIsImEiOiJja28wZWc2eGUwY3J4Mm9udzgxZ2UyczJtIn0.EL9SXrORqd-RVmxedhJdxQ'
      }).addTo(this.map);
      // this.agregarMarcadores();

      // setTimeout(() => {
      //   loading.dismiss();
      // }, 1500);
  }

 


  get serviciosMedicosFunc(){
    return this.posts?.controlesMedicos && this.posts?.controlesMedicos[0].children.some((valor) => valor.value === true);
  }

  get serviciosSanitariosFunc(){
    return this.posts?.servicioSanitarios && this.posts?.servicioSanitarios[this.posts?.servicioSanitarios.length - 1].children.some((valor) => valor.value === true);
  }
  get serviciosAtencionFunc(){
    return this.posts?.serviciosAtencion && this.posts?.serviciosAtencion[0].children.some((valor) => valor.value === true);
  }
  get serviciosTerapeuticosFunc(){
    return this.posts?.servisioTerapeuticos && this.posts?.servisioTerapeuticos[0].children.some((valor) => valor.value === true);
  }
  get serviciosAdicionalesFunc(){
    return this.posts?.serviciosAdicionales && (this.posts?.serviciosAdicionales.some((valor) => valor.value === true) && (this.posts.alimentacion === 'Si' || this.posts.aseo === 'si' || this.posts.transporte !== 'No'));
  }
  get serviciosComodidadFunc(){
    return this.posts?.serviciosComodidad && this.posts?.serviciosComodidad[0].children.some((valor) => valor.value === true);
  }

  get HorariosDias(){
    return this.posts?.horas?.diasSemana && this.posts.horas.diasSemana.every((dias) => dias.completed === true) ;
  }

  ngOnDestroy(): void {
    this.asilomensajes.ngOnDestroy();
  }
  

}
