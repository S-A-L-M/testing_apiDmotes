import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SigninService {

  url: string = environment.URL_API + 'inicio';

  constructor(private http: HttpClient, private router: Router) {}

  loginByEmail(form: { email:string, password:string }) {
    return this.http.post<any>(this.url, form)
  }

  setToken(token:any) {
   localStorage.setItem('authToken', token.token)
  }

  isTokenValid() {
    return Boolean(localStorage.getItem('authToken')); 
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/'])
  } 
}
