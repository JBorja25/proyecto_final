
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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





const routes: Routes = [
 
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },

   {path:'',component:HomeComponent},

   { 
     path: 'asilo',
     canActivate: [AuthasilosGuard],
    //  component: RegisAsiComponent,
     children: [
       { path: 'regis-asi', component: RegisAsiComponent},
     ],
   },

   {
     path: 'gerente',
     canActivate: [AuthGuard],
    //  component: ShowComponent,
     children: [
       { path: 'show', component: ShowComponent },
       { path: 'edit/:id', component: EditComponent},
       { path: 'create', component: CreateComponent},
     ],
   },
 
  { path: 'perfiles', component: PerfilesComponent },


 


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
