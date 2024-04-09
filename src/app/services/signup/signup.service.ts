import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Signup } from 'src/app/models/signup/signup';
import { Response } from 'src/app/models/signup/response';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url:string = environment.URL_API + 'registro'

  constructor(private http: HttpClient) { }


  RegisterByEmail(form:Signup){
    return this.http.post<Response>(this.url, form,)
  }
}