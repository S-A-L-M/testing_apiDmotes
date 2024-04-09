import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin/signin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private signinService: SigninService, private router: Router) {}

  canActivate(): boolean {

    if(!this.signinService.isTokenValid()) {
      this.router.navigate(['/']);
      
      return false;
    }
    return true
  }
}
