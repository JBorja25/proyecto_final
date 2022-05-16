import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { getStorage, ref, uploadBytes } from "firebase/storage";




@Injectable({
  providedIn: 'root'
})
export class SubirfotosService {

  constructor(
    private _storage: AngularFireStorage
  ) { }

  async insertImages(file: File){
   const ref = this._storage.ref('img/' + file.name);
   const upload = ref.put(file);
   console.log(upload);
   /* let numero = ((await upload).bytesTransferred/(await upload).totalBytes)*100;
   console.log(numero); */
  return upload;
   
    
  }

  insertarPDF(archivo: File){
    // const ref = this._storage
  }
}
