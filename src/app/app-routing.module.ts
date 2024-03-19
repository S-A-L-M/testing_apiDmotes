import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './views/Err/error404/error404.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { LoginComponent } from './views/auth/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'dashboard', component: DashboardComponent, children: [
  ]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
