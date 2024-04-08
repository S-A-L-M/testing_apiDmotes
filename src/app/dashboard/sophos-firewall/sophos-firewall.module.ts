import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SophosFirewallRoutingModule } from './sophos-firewall-routing.module';
import { SdwanComponent } from './sdwan/sdwan.component';
import { FirewallComponent } from './firewall/firewall.component';


@NgModule({
  declarations: [
    SdwanComponent,
    FirewallComponent
  ],
  imports: [
    CommonModule,
    SophosFirewallRoutingModule
  ]
})
export class SophosFirewallModule { }
