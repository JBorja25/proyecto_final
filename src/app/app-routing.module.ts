
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importar componentes
import { ShowComponent } from './auth/show/show.component';
import { CreateComponent } from './auth/create/create.component';
import { EditComponent } from './auth/edit/edit.component';
import { RegisAsiComponent } from './auth/regis-asi/regis-asi.component';





const routes: Routes = [
 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
   { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },

   {path:'',component:HomeComponent},
 
  { path: 'perfiles', loadChildren: () => import('./auth/perfiles/perfiles.module').then(m => m.PerfilesModule) },
  { path: 'show', component: ShowComponent },
  { path: 'create', component: CreateComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'regis-asi', component: RegisAsiComponent},


 


  ];
   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/* {
    path: 'a',
    component:,
    children: [
      {

      }
    ]
  }
   { 
    path: '',
    component:ShowComponent,
    children: [
      { path: '', loadChildren: () => import('./auth/show/show.component').then(m => m.ShowComponent)},
      {path: 'create', loadChildren: () => import('./auth/create/create.component').then(m => m.CreateComponent)},
      {path: 'edit/:id', loadChildren: () => import('./auth/edit/edit.component').then(m => m.EditComponent)},
 

    ]
  }
  
  
  */
