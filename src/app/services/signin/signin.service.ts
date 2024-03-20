import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Signin } from 'src/app/models/signin/signin';
import { Token } from 'src/app/models/signin/response';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  token! : Token | any;
  expiresat! : Token | any;
    
  url: string = environment.URL_API + 'inicio';

  constructor(private http: HttpClient) {}

  LoginByEmail(form: Signin) {
    return this.http.post<Token>(this.url, form).pipe(
      tap((data: Token) => {
        this.token = data.token; 
        this.expiresat = data.expires_at
        localStorage.setItem('authToken', this.token.token);
        localStorage.setItem('tokenExpiration', this.token.expires_at);
        console.log(this.token)
        console.log(this.expiresat)
      })
    );
  }

  getLocalStorage() {
   return localStorage.getItem('authToken');
  }
}

