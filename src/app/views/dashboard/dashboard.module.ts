import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './main/statistics.component';
import { DataComponent } from './datas/data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importar NgbModule

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
    DataComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule // Agregar NgbModule al array de imports
  ]
})
export class DashboardModule { }