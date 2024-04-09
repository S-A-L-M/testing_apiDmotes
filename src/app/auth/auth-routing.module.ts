import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SessionGuard } from '../guard/session/session.guard';

const routes: Routes = [
  { path:'', redirectTo:'signin', pathMatch:'full' },
  { path:'signin', component: SigninComponent,canActivate: [SessionGuard]},
  { path:'signup', component: SignupComponent,canActivate: [SessionGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
