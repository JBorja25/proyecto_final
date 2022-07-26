import { HomeComponent } from './home/home.component';

import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { HTTP } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import { initializeApp, provideFirebaseApp  }from '@angular/fire/app';
import { Component } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
// import { SwiperModule } from 'swiper/angular';



import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateComponent } from './auth/create/create.component';
import { EditComponent } from './auth/edit/edit.component';
import { ShowComponent } from './auth/show/show.component';
import { RegisAsiComponent } from './auth/regis-asi/regis-asi.component';
import { CookieService } from 'ngx-cookie-service';

// import { RegisterModule } from './auth/register/register.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthasilosGuard } from './guards/authasilos.guard';
import { AuthService } from './auth/services/auth.service';
import { RegisallComponent } from './auth/regisall/regisall.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { PruebaComponent } from './shared/prueba/prueba/prueba.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { Prueba2Component } from './shared/prueba2/prueba2/prueba2.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';

import { PerfilComponent } from './auth/perfil/perfil.component';
import { MatLabel } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PerfilesComponent } from './auth/perfiles/perfiles.component';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProformaComponent } from './auth/proforma/proforma.component';




import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RechazadosComponent } from './auth/show/rechazados/rechazados.component';
import { DialogrechazarComponent } from './auth/show/dialogrechazar/dialogrechazar.component';
import { ProfileasiloComponent } from './auth/profileasilo/profileasilo/profileasilo.component';
import { CambiarimgComponent } from './auth/profileasilo/cambiarimg/cambiarimg.component';
import { ProfileadminComponent } from './auth/profileadmin/profileadmin.component';
import { ChangemailComponent } from './auth/profileasilo/changemail/changemail.component';
import { GivepassComponent } from './auth/profileasilo/givepass/givepass.component';
import { DialogasilosComponent } from './home/dialogasilos/dialogasilos/dialogasilos.component';
import { ToastrModule } from 'ngx-toastr';
import { CoverproformaComponent } from './auth/coverproforma/coverproforma/coverproforma.component';
import { AsilorechazadoComponent } from './auth/asilorechazado/asilorechazado/asilorechazado.component';
import { OlvidopassComponent } from './auth/olvidopass/olvidopass/olvidopass.component';
import { MostrarPipe } from './pipes/mostrar.pipe';
import { AllsilosComponent } from './auth/allasilos/allsilos/allsilos.component';


/* PrimeNG */
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { GMapModule } from 'primeng/gmap';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { MessagesModule } from 'primeng/messages';
import { PickListModule } from 'primeng/picklist';
import { TreeModule } from 'primeng/tree';
import { SwiperModule } from 'swiper/angular';
import { MessageasiloComponent } from './auth/messages/messageasilo/messageasilo.component';
import { ModuleasiloComponent } from './auth/messages/moduleasilo/moduleasilo/moduleasilo.component';
import { ContentComponent } from './auth/messages/messageasilo/messagecontent/content/content.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  AppComponent,
   CreateComponent,
   EditComponent,
   ShowComponent,
   EditComponent,
   RegisAsiComponent,
   RegisallComponent,
   PruebaComponent,
   Prueba2Component,
   PerfilComponent,
   NavbarComponent,
   HomeComponent,
   RegisterComponent,
   LoginComponent,
   PerfilesComponent,
   ProformaComponent,
   RechazadosComponent,
   DialogrechazarComponent,
   ProfileasiloComponent,
   CambiarimgComponent,
   ProfileadminComponent,
   ChangemailComponent,
   GivepassComponent,
   DialogasilosComponent,
   CoverproformaComponent,
   AsilorechazadoComponent,
   OlvidopassComponent,
   MostrarPipe,
   AllsilosComponent,
   MessageasiloComponent,
   ModuleasiloComponent,
   ContentComponent,
   

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatExpansionModule,
    SwiperModule,
    SwiperModule,
    MatTreeModule,
    PasswordModule,
    AngularFireAuthModule,
    ButtonModule,
    DialogModule,
    ChipModule,
    GMapModule,
    TreeModule,
    HttpClientModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    PickListModule,
    AvatarModule,
    AngularFireStorageModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    CarouselModule,
    CardModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),


  ],
  providers: [CookieService, AuthService],
  bootstrap: [AppComponent],
  exports:[
    NavbarComponent
  ]
})
export class AppModule { }
