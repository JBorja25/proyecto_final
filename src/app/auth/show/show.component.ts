import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
//importa el modelo 
import { Post } from 'src/app/models/post.model';
//importar servico
import { PostService } from 'src/app/models/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RechazadosComponent } from './rechazados/rechazados.component';

import { MatDialog } from '@angular/material/dialog';
import { DialogrechazarComponent } from './dialogrechazar/dialogrechazar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['NOMBRE', 'direcicon', 'email', 'telefono'];
  dataSourceAprobados = new MatTableDataSource;
  dataSourceRechazados = new MatTableDataSource;
  

  @ViewChild(MatPaginator) pagaprobados: MatPaginator;

  @ViewChild('recargar', { static: false}) rechazadosComponent : RechazadosComponent;
  
  showFiller = false;
  PostAprobados: any[] = [];
  postrechazados: any[] = [];
  postPendientes: any[] = [];

  constructor(
    private postService: PostService,
    private _cookie: CookieService,
    private _auth: AuthService,
    private router: Router,
    private _dialog: MatDialog
    ) { }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.cargarAsilosAprobados();
    this.getAsilosPendiente();
    console.log(this.pagaprobados);
  }

  ngOnInit(): void {
    
    /* this.postService.getPosts().subscribe((res)=>{
      this.Post= res.map((e)=>{
        return {
          id:e.payload.doc.id,
          ...(e.payload.doc.data() as Post)
        };
      });
    }); */
    // this.cargarAsilosAprobados();
    
    
  }

  getAsilosPendiente(){
    this.postService.getPostId()
    .subscribe((resp:any) => {
      console.log(resp);
      this.postPendientes = [];
      for (let f of resp.docs) {
        console.log(f.data());

        if(!f.data().aprobado && !f.data().rechazar){
          this.postPendientes.push({ data: f.data(), idDoc: f.id });
          this.dataSourceAprobados=new MatTableDataSource<any>(this.PostAprobados);
        }
      }

    });
  }

  cargarAsilosAprobados(){
    this.postService.getPostId()
      .subscribe((resp:any) => {
        console.log(resp);
        this.PostAprobados = [];
        // this.postrechazados = [];
        for (let f of resp.docs) {
          console.log(f.data());

          if(f.data().aprobado && !f.data().rechazar){
            this.PostAprobados.push({ data: f.data(), idDoc: f.id });
            this.dataSourceAprobados=new MatTableDataSource<any>(this.PostAprobados);
            console.log(this.dataSourceAprobados);
            
          }else if(!f.data().aprobado && f.data().rechazar){
            console.log('entra en rechazado');
            
            this.postrechazados.push({ data: f.data(), idDoc: f.id });
            console.log(this.postrechazados);
            
            // this.dataSourceRechazados=new MatTableDataSource<any>(this.postrechazados);
          }
        }

      });
  }

  deleteRow = (post) => {
    this.postService.deletePosts(post);
    this.cargarAsilosAprobados();
    this.getAsilosPendiente();
    this.rechazadosComponent.ngAfterViewInit();
  };

  aprobar(post: any) {
    console.log(post);

    this.postService.actualizarAprobacion(true, false, false, post.idDoc)
      .then((resp) => {
        console.log(resp);
        this.getAsilosPendiente();
        this.cargarAsilosAprobados();
        this.rechazadosComponent.ngAfterViewInit();
      });
      
    }
    
    rechazar(post: any){
      // primero ejecutas el dialog, metodos afterdidClose().subscribe()
      const dialog = this._dialog.open(DialogrechazarComponent, {
        width: '350px',
        height: '250px',
        closeOnNavigation:false,
        disableClose: true,
        data: post.idDoc
      });

      dialog.afterClosed()
      .subscribe((resp) =>{
        if(resp.v){
          Swal.fire('Guardando', 'Guardando registro, espere por favor...', 'info');
          Swal.showLoading();
          this.postService.actualizarRechazados(false, false, false, true, post.idDoc, resp.mensaje)
          .then((resp) => {
            console.log(resp);
            this.getAsilosPendiente();
            this.cargarAsilosAprobados();
            this.rechazadosComponent.ngAfterViewInit();
            Swal.close();
    
        });
        }
      })
  }
  async cerrar() {
    this._cookie.deleteAll();
    await this._auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: false });
  }



}
