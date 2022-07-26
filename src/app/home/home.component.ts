import { Component, OnInit } from '@angular/core';
import { PostService } from '../models/post.service';
import SwiperCore, { A11y, Autoplay, EffectCube, Navigation, Pagination, Scrollbar, Swiper, SwiperOptions } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { DialogasilosComponent } from './dialogasilos/dialogasilos/dialogasilos.component';
import { Router } from '@angular/router';
// para neviar correos
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import SwiperCore from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/effect-cube';
import 'swiper/scss/autoplay';
import { environment } from 'src/environments/environment';

declare var L: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sugerenciasForm:FormGroup;
  enviarSugerencia: boolean = false;
  map: any;
  fotos: any[] = [
    {
      alt: '1',
      path: '../../assets/img/1.jpg' 
    },
    {
      alt: '2',
      path: '../../assets/img/2.jpg' 
    },
    {
      alt: '3',
      path: '../../assets/img/3.jpg' 
    },
    {
      alt: '3',
      path: '../../assets/img/servicios1.jpg' 
    }
  ]
  config: SwiperOptions  = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    autoplay: {delay:2500},
    fadeEffect: {crossFade: true },
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCube]
  };

  posts: any[] = [];
  marcadores: any[] = [];
  fecha = new Date().getFullYear();
  dataAsilo:any = {};
  constructor(
    private _post: PostService,
    private _dialog: MatDialog,
    private _route: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.crearFormulario();

    setTimeout(() => {
      this.mapa();
    }, 300);

    setTimeout(() => {
      navigator.permissions.query({name: 'geolocation'})
      .then((permiso) => {
        if(permiso.state == 'granted'){
          navigator.geolocation.getCurrentPosition((location) =>{
            this.map.flyTo([location.coords.latitude, location.coords.longitude], 9);
          })
        }else if(permiso.state == 'prompt'){
          navigator.geolocation.getCurrentPosition((location) =>{
            this.map.flyTo([location.coords.latitude, location.coords.longitude], 9);

          })
        }
      })
    }, 900);
    
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  getPosts(){
    this._post.getPostIdLimit()
    .subscribe((resp: any) =>{
      console.log(resp);
      this.posts = [];
      for(let f of resp.docs){
        if(f.data().tipo != ' admin' && f.data().aprobado){
          this.posts.push(f.data());
          setTimeout(() => {
            this.agregarMarcador(f.data());
          }, 600);
        }
      }
      console.log(this.posts);
      
    })
  }

  abrirDialog(uid: any){
    this._route.navigateByUrl(`/info-asilo/${uid}`);
  }

  crearFormulario(){
    this.sugerenciasForm = this._fb.group({
      from_name: ['', [Validators.required]],
      reply_to: ['', [Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      message: ['', [Validators.required]]
    })
  }

  enviarSugerenciaCorreo(){

    if(this.sugerenciasForm.invalid){
      return Object.values( this.sugerenciasForm.controls ).forEach((validator) => {
        validator.markAllAsTouched()
      });
    }
    let templateParams = {
      ...this.sugerenciasForm.getRawValue(),
      to_name: 'Jose borja'
    }
    this.enviarSugerencia = true;
    console.log(templateParams);

    emailjs.send(environment.serviceID, environment.templateID, templateParams, environment.publicKey)
    .then((resp) =>{
      console.log(resp);
      this.enviarSugerencia = false;
      this.sugerenciasForm.reset();
    })
    .catch((err) =>{
      console.log(err);
      
    })
    
  }

  mapa(latitude: number = -0.2580184401705081, longitude: number = -78.5413005746294){
    // await loading.present();
    this.map = L.map('mapa', {center: [latitude, longitude], zoom:9});
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

  agregarMarcador(dataAsilo: any){
    let popup:any;
    const html = `
        
        <b><h5><b>${ dataAsilo.name }</b></h5></b>
        <span>${ dataAsilo.address }</span><br/>
        `;
        let marker = L.marker([dataAsilo.lat, dataAsilo.lng])
                .addTo(this.map).bindPopup(html);
                
        this.marcadores.push(marker);
                
        // marker.on('click', () => {
        //   popup = L.popup()
        //   .setLatLng([dataAsilo.lat, dataAsilo.lng])
        //   .setContent(html)
        //   .openOn(this.map);
        // });
  }
  /* errores */
  get nombreError(){
    return this.sugerenciasForm.get('from_name').hasError('required') && (this.sugerenciasForm.get('from_name').touched || this.sugerenciasForm.get('from_name').dirty);
  }
  get correoError(){
    return this.sugerenciasForm.get('reply_to').hasError('required') && (this.sugerenciasForm.get('reply_to').touched || this.sugerenciasForm.get('reply_to').dirty);
  }
  get correoErrorPattern(){
    return this.sugerenciasForm.get('reply_to').hasError('pattern') && (this.sugerenciasForm.get('reply_to').touched || this.sugerenciasForm.get('reply_to').dirty);
  }
  get mensajeError(){
    return this.sugerenciasForm.get('message').hasError('required') && (this.sugerenciasForm.get('reply_to').touched || this.sugerenciasForm.get('reply_to').dirty);
  }

}


/**
* Template Name: Reveal - v4.7.0
* Template URL: https://bootstrapmade.com/reveal-bootstrap-corporate-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


  /**
   * Easy selector helper function

  /**
   * Easy event listener function
   */


  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  
  /**
   * Clients Slider
   */
  new Swiper('.hero-slider', {
    speed: 1000,
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  });

  /**



  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  })
