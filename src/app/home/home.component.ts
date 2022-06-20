import { Component, OnInit } from '@angular/core';
import { PostService } from '../models/post.service';
import SwiperCore, { Swiper } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { DialogasilosComponent } from './dialogasilos/dialogasilos/dialogasilos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any[] = [];
  fecha = new Date().getFullYear();

  constructor(
    private _post: PostService,
    private _dialog: MatDialog,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.getPosts();
    
  }

  getPosts(){
    this._post.getPostId()
    .subscribe((resp: any) =>{
      console.log(resp);
      this.posts = [];
      for(let f of resp.docs){
        if(f.data().tipo != ' admin' && f.data().aprobado){
          this.posts.push(f.data());
        }
      }
      console.log(this.posts);
      
    })
  }

  abrirDialog(uid: any){
    this._route.navigateByUrl(`/info-asilo/${uid}`);
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
