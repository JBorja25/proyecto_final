import { Prueba2Component } from './shared/prueba2/prueba2/prueba2.component';
import { PruebaComponent } from './shared/prueba/prueba/prueba.component';


import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

//importar componentes
import { ShowComponent } from './auth/show/show.component';
import { CreateComponent } from './auth/create/create.component';
import { EditComponent } from './auth/edit/edit.component';
import { RegisAsiComponent } from './auth/regis-asi/regis-asi.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PerfilesComponent } from './auth/perfiles/perfiles.component';
import { AuthasilosGuard } from './guards/authasilos.guard';
import { RegisallComponent } from './auth/regisall/regisall.component';
import { ProformaComponent } from './auth/proforma/proforma.component';
import { ProfileasiloComponent } from './auth/profileasilo/profileasilo/profileasilo.component';
import { ProfileadminComponent } from './auth/profileadmin/profileadmin.component';
import { ChangemailComponent } from './auth/profileasilo/changemail/changemail.component';
import { GivepassComponent } from './auth/profileasilo/givepass/givepass.component';
import { DialogasilosComponent } from './home/dialogasilos/dialogasilos/dialogasilos.component';
import { CoverproformaComponent } from './auth/coverproforma/coverproforma/coverproforma.component';
import { OlvidopassComponent } from './auth/olvidopass/olvidopass/olvidopass.component';
import { AllsilosComponent } from './auth/allasilos/allsilos/allsilos.component';
import { ModuleasiloComponent } from './auth/messages/moduleasilo/moduleasilo/moduleasilo.component';





const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'asilo',
    canActivate: [AuthasilosGuard],
    children: [
      { path: 'regisall', component: RegisallComponent },
      { path: 'regis-asi', component: RegisAsiComponent },
      { path: 'profile', component: ProfileasiloComponent },
      { path: 'info', component: GivepassComponent },
      { path: 'mensajes/:uid', component: ModuleasiloComponent }

    ]
  },

  {
    path: 'gerente',
    canActivate: [AuthGuard],
    children: [
      { path: 'show', component: ShowComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'create', component: CreateComponent },
      { path: 'profile', component: ProfileadminComponent }
    ]
  },

  { path: 'perfiles', component: PerfilesComponent },
  { path: 'p',
    children: [
      {
        path: 'cover',
        component: CoverproformaComponent
      },
      {
        path: 'proforma',
        component: ProformaComponent
      }
    ]
  },
  { path: 'info-asilo/:uid', component:DialogasilosComponent },
  { path: 'olvido-pass', component:OlvidopassComponent },
  {
    path: 'allasilos', component: AllsilosComponent
  },
  // { path: 'proforma', loadChildren: () => import('./auth/proforma/proforma.component').then(m => m.ProformaComponent) },
  { path: '**', component: HomeComponent },






];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

