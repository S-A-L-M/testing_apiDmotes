import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guard/auth/auth.guard';
const routes: Routes = [
  { path: "", component: DashboardComponent,canActivate: [AuthGuard],  children:[
    {path:'', component: HomeComponent},
    {path: 'sophos-central', loadChildren:()=> import('./sophos-central/sophos-central-routing.module').then(module => module.SophosCentralRoutingModule)},
    {path: 'sophos-firewall', loadChildren:()=>import('./sophos-firewall/sophos-firewall-routing.module').then(module => module.SophosFirewallRoutingModule)},
    {path: 'vicarius', loadChildren:()=>import('./vicarius/vicarius-routing.module').then(module => module.VicariusRoutingModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
