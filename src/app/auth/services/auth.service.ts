import { Injectable } from '@angular/core';
/*import {auth} from '@angular/fire/app';
import {User} from '@angular/fire';*/
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { Firestore } from '@angular/fire/firestore/firebase';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthService {
  //public user:User;

  resultado: any;

  constructor(public afAuth: AngularFireAuth, private _f:AngularFirestore, private _cookie: CookieService ) { }

  async login(email: string, password: string) {
    try {
      const result =  this.afAuth.signInWithEmailAndPassword(email, password);
      return result;

    } catch (error) {
      console.log(error);
      return error;
    }

  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;

    } catch (error) {
      console.log(error);
      return error;
    }



  }

  guardarCookie(tipo: any, token: any){
    console.log('entra en guardar');
    
    if(tipo === 'admin'){
      this._cookie.set('tipo', tipo, { path: '/', sameSite: 'Lax' });
      this._cookie.set('uid', token, { path: '/', sameSite: 'Lax' });
    }else{
      this._cookie.set('tipo', tipo, { path: '/', sameSite: 'Lax' });
      this._cookie.set('uid', token, { path: '/', sameSite: 'Lax' });
    }
  }

  guardarInfoRegistro(dataRegistro: any){
    return this._f.collection('registro').add(dataRegistro);
  }

  traerDataFirebase(uid: string){
    return this._f.collection('registro', ref => ref.where('uid', '==', uid)).get();
  }

  traerDataPost(uid: string){
    return this._f.collection('post', ref => ref.where('uid', '==', uid)).get();
  }

  async logout() {
    try {
      // this._cookie.deleteAll();
      this._cookie.deleteAll('/');
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getPost(uid: string){
    return this._f.collection('post', ref => ref.where('uid', '==', uid)).get();
  }

  getCurrentUser(){
    return this.afAuth.currentUser;
  }

  insertName(){
    return this.afAuth.user;
  }
  insertTelefono(nombre: any){
    return this.afAuth.user;
  }
  insertPhoto(){
    return this.afAuth.user;
  }

  insertCorreo(){
    return this.afAuth.authState;
  }

  updateDireccion(direccion: any, phone: any, idDoc: string){
    return this._f.collection('registro').doc(idDoc).update({
      direccion,
      phone
    });
  }

  reautenticar(passw:any){
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      passw
    );
    return user.reauthenticateWithCredential(credential);
    /* try{
    }
    catch(error){
    } */

  }

  
}
