import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
import { ValuesComponent } from './values/values.component';


@NgModule({
  declarations: [
    PersonalComponent,
    ValuesComponent,
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule
  ]
})
export class PersonalModule { }
