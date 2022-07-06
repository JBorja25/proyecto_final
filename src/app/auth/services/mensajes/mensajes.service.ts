import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(
  private _angularFire: AngularFirestore
  ) { }

  guardarMensajes(data: any){
    this._angularFire.collection('mensajes').add(
      data
    )
  }
}
