import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginI } from 'src/app/models/register/register.interface';
import { ResponseI } from '../../models/login/response.interface';
import { environment } from 'src/environments/login/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = environment.URL_API + 'inicio';
  constructor(private http: HttpClient) { }

  LoginByEmail(form:LoginI){
   
    return this.http.post<ResponseI>(this.url, form);

  }
 
}
 // public getData(email?: string, password?: string): Observable<any>{
  //   const body = email && password ? { email, password } : {};
  //   return this.http.post<any>(this.urlApi, body);
  // }