import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component'; 
import { ValuesComponent } from './values/values.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PersonalComponent, 
    ValuesComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    RouterModule
  ]
})
export class PersonalModule { }