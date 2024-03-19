import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/register/environment';
import { ResponseRegisterI } from 'src/app/models/register/response.interface';
import { RegisterI } from 'src/app/models/login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url:string = environment.URL_API + 'registro'

  constructor(private http: HttpClient) { }


  RegisterByEmail(form:RegisterI){
    return this.http.post<ResponseRegisterI>(this.url, form,)
  }
}
