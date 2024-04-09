import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private _signinservice: SigninService, private router: Router) {}

  canActivate(): boolean {
    if (this._signinservice.isTokenValid()) {
      this.router.navigate(['/dashboard']); 
      return false; 
    }
    return true;
  }
}