import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Signin } from 'src/app/models/signin/signin';
import { Response } from 'src/app/models/signin/response';


@Injectable({
  providedIn: 'root'
})
export class SigninService {

  url:string = environment.URL_API + 'inicio';
  constructor(private http: HttpClient) { }

  LoginByEmail(form:Signin){
   
    return this.http.post<Response>(this.url, form);

  }
 
}
 // public getData(email?: string, password?: string): Observable<any>{
  //   const body = email && password ? { email, password } : {};
  //   return this.http.post<any>(this.urlApi, body);
  // }