import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './main/statistics.component';
import { DataComponent } from './datas/data.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { PersonalComponent } from '../personal/personal.component';
import { ValuesComponent } from '../personal/values/values.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: StatisticsComponent },
      { path: 'data', component: DataComponent },
      { path: 'graphics', component: GraphicsComponent },
      { path: 'personal', component: PersonalComponent, children: [ 
        { path: 'values', component: ValuesComponent } 
      ]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }