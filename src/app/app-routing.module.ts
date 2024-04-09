import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { Error404Component } from './views/error404/error404.component';
import { SessionGuard } from './guard/session/session.guard'; 

const routes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [SessionGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [SessionGuard] }, 
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('../app/views/dashboard/dashboard-routing.module').then(module => module.DashboardRoutingModule) },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
