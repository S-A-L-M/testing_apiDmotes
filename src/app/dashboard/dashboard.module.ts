import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SophosCentralModule } from './sophos-central/sophos-central.module';
import { SophosFirewallModule } from './sophos-firewall/sophos-firewall.module';
import { VicariusModule } from './vicarius/vicarius.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SophosCentralModule,
    SophosFirewallModule,
    VicariusModule,
    DashboardRoutingModule,
    
  ]
})
export class DashboardModule { }
