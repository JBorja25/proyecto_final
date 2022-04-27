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
@Injectable()
export class AuthService {
  //public user:User;

  constructor(public afAuth: AngularFireAuth, private _f:AngularFirestore ) { }

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

  traerDataFirebase(uid: string){
    return this._f.collection('registro', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }


  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
