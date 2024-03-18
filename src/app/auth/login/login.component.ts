import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginI } from 'src/app/models/login.interface';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {



  loginForm : FormGroup;
  


  constructor (
    private _loginService:LoginService,
    private form: FormBuilder
    ) {

    this.loginForm = form.group({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.loginForm.controls['email'].valueChanges.subscribe()
      
  }
  onLogin(){
    this._loginService.LoginByEmail(this.loginForm.value).subscribe(data =>{
      console.log(data);
    })

  }
}