import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
   { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
   {path:'',
  component:HomeComponent
  },
  
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
  } */
