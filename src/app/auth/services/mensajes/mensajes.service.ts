import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
// import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  hora = new Date();

  constructor(
  private _angularFire: AngularFirestore
  ) { }

  guardarMensajes(data: any){
    let enviar = {
      tipo: 'anonimo',
      mensajes: firebase.default.firestore.FieldValue.arrayUnion(data)
    }
    return this._angularFire.collection('mensajes').add(enviar)
  }

  getMensajes(){
    return this._angularFire.collection('mensajes').get();
  }
  getMensajesId(idDoc: string){
    return this._angularFire.collection('mensajes').doc(idDoc).get();
  }

  updateMensajes(dataMensajes: any, mensaje: any, uid: string, idDoc: string){
    let mensajes = {
      uid,
      mensaje,
      time: this.hora.getTime(),
      hora: `${this.hora.getHours()}:${this.hora.getMinutes() < 10 ? '0'+this.hora.getMinutes() : this.hora.getMinutes()}:${ this.hora.getSeconds() < 10 ? '0'+this.hora.getSeconds() : this.hora.getSeconds()}`
    }
    return this._angularFire.collection('mensajes').doc(idDoc).update({
      mensajes: firebase.default.firestore.FieldValue.arrayUnion(mensajes)
    })
  }
}
