import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp  }from '@angular/fire/app';
import { Component } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';



import { AngularFireModule } from '@angular/fire/compat';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilesModule } from './auth/perfiles/perfiles.module';
import { CreateComponent } from './auth/create/create.component';
import { EditComponent } from './auth/edit/edit.component';
import { ShowComponent } from './auth/show/show.component';
import { FormsModule } from '@angular/forms';
import { RegisAsiComponent } from './auth/regis-asi/regis-asi.component';

@NgModule({
  declarations: [
    AppComponent,
   NavbarComponent,
   
   CreateComponent,
   EditComponent,
   ShowComponent,
   EditComponent,
   RegisAsiComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    PerfilesModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
