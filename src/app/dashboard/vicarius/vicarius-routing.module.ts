import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { VulnerabityComponent } from './vulnerabity/vulnerabity.component';

const routes: Routes = [
  {path: 'vulnerability', component: VulnerabityComponent},
  {path: 'access', component: AccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VicariusRoutingModule { }
