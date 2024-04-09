import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VicariusRoutingModule } from './vicarius-routing.module';
import { VulnerabityComponent } from './vulnerabity/vulnerabity.component';
import { AccessComponent } from './access/access.component';


@NgModule({
  declarations: [
    VulnerabityComponent,
    AccessComponent
  ],
  imports: [
    CommonModule,
    VicariusRoutingModule
  ]
})
export class VicariusModule { }
