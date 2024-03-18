import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/dashboard/home/home.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'Signup', pathMatch: 'full'
    },
    {
        path: 'Signup',
        component:SignupComponent
    },
    {
        path: '',
        component:SigninComponent,
        children:[
            {
                path: 'dashboard',
                component: HomeComponent
            }
        ]
    },
];
