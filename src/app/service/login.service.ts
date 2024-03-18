import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = 'http://54.221.48.204:3333/api/v2/login';

  constructor(private http: HttpClient) { }

  LoginByEmail(form:LoginI){
   
    return this.http.post<ResponseI>(this.url, form);

  }
 
}
 // public getData(email?: string, password?: string): Observable<any>{
  //   const body = email && password ? { email, password } : {};
  //   return this.http.post<any>(this.urlApi, body);
  // }