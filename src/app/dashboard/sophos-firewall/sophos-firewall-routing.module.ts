import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdwanComponent } from './sdwan/sdwan.component';
import { FirewallComponent } from './firewall/firewall.component';

const routes: Routes = [
  {path:'sdwan', component: SdwanComponent},
  {path:'firewall', component: FirewallComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SophosFirewallRoutingModule { }
