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

  async insertImages(file: any, nombreUser: string){
    console.log(nombreUser);
    
    let dividir = file.name.split('.');
    console.log(dividir);
    
   const ref = this._storage.ref(`img/${nombreUser}/` + nombreUser + "." + dividir[dividir.length - 1]);
   const upload = ref.put(file);
   console.log(upload);
   /* let numero = ((await upload).bytesTransferred/(await upload).totalBytes)*100;
   console.log(numero); */
  return upload;
   
    
  }

  insertarPDF(archivo: File){
    const refDoc = this._storage.ref('doc/' + archivo.name);
    const upload = refDoc.put(archivo);
    console.log(upload);

    return upload;
    
  }

  getImages(){
    const refIMG = this._storage.ref('img');
    console.log(refIMG);
    return refIMG;
    
  }
}
