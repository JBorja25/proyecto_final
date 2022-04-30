import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilesRoutingModule } from './perfiles-routing.module';
import { PerfilesComponent } from './perfiles.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';


@NgModule({
  declarations: [
    PerfilesComponent
  ],
  imports: [
    CommonModule,
    PerfilesRoutingModule
  ]
})
export class PerfilesModule { }
