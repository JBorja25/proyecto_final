import { FormsModule } from '@angular/forms';
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
    ProformaRoutingModule,
    FormsModule
  ]
})
export class ProformaModule { }
