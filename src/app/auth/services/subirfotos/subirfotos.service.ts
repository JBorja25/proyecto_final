import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import * as firebase from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore/firebase';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class SubirfotosService {

  constructor(
    private _storage: AngularFireStorage
  ) { }

  async insertImages(file: File, valor: any){
    console.log(file);
    const files = file;
    const filePath = `img/${ files.name }`;
    const ref = this._storage.ref(filePath);
    const task = ref.put(files);
    console.log(task);
    
    
  }
}
