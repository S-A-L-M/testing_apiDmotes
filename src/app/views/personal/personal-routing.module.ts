import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { ValuesComponent } from './values/values.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent,
    children: [
      { path: '', redirectTo: 'personal', pathMatch: 'full' },  
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
