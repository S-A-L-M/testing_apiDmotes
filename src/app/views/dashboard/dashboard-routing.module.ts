// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './main/statistics.component';
import { DataComponent } from './datas/data.component';
import { GraphicsComponent } from './graphics/graphics.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: StatisticsComponent },     
      { path: 'data', component: DataComponent },
      { path: 'graphics', component: GraphicsComponent },
      { path: 'personal', loadChildren: () => import('../personal/personal-routing.module').then(module => module.PersonalRoutingModule) },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }