import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './main/statistics.component';
import { DataComponent } from './datas/data.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
    
  ]
})
export class DashboardModule { }
