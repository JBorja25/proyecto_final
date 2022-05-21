import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { SubirfotosService } from '../../services/subirfotos/subirfotos.service';

@Component({
  selector: 'app-cambiarimg',
  templateUrl: './cambiarimg.component.html',
  styleUrls: ['./cambiarimg.component.scss']
})
export class CambiarimgComponent implements OnInit {

  urlimg: any= '';
  img: any = '';

  constructor(
    private _ref: MatDialogRef<CambiarimgComponent>,
    private _sanitize: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fotos: SubirfotosService,
    private _auth: AuthService

  ) { 
    console.log(this.data);
    
  }

  ngOnInit(): void {
  }

  cerrar(cerrar: boolean){
    this._ref.close(cerrar);
  }

  cambiarIMG(evento: any){
    console.log(evento);
    this.img = evento.target.files[0];
    
    const obj = URL.createObjectURL(evento.target.files[0]);
    console.log(obj);
    
    this.urlimg = (evento.target.files.length > 0) ? this._sanitize.bypassSecurityTrustUrl(obj): '';
  }

  guardar(){
    this._fotos.insertImages(this.img, this.data.data)
    .then((resp) =>{
      resp.ref.getDownloadURL()
      .then((url) =>{
        this._auth.insertPhoto()
        .subscribe((photo) =>{
          photo.updateProfile({
            photoURL: url
          })
          .then((respPhoto) =>{
            console.log('se subio la foto');
            
            
          })
          .catch((err) =>{});
        })
      });
      console.log('se subio la imagen');
      this.cerrar(true);
    })
    .catch((error)=>{});
  }



}
