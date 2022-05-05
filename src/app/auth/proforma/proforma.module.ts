import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProformaRoutingModule } from './proforma-routing.module';
import { ProformaComponent } from './proforma.component';


@NgModule({
  declarations: [
    ProformaComponent
  ],
  imports: [
    CommonModule,
    ProformaRoutingModule
  ]
})
export class ProformaModule { }
