import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './main/statistics.component';
import { DataComponent } from './datas/data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { MatIconModule } from '@angular/material/icon';  
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
    DataComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    MatIconModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { 
  title = 'barchartApp';
  dataset = [
    { name: "X", value: 1 },
    { name: "Y", value: 2 }
  ];
}