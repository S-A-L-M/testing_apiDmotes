import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  showLoader = false; 
  
  constructor(
    private router: Router,
    private _registerservice: RegisterService,
    private form: FormBuilder

  ){
    this.registerForm = form.group({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.minLength(8))
    })
  }
  ngOnInit(): void {
      this.registerForm.controls['email'].valueChanges.subscribe();
  }

  onRegister(){
    this._registerservice.RegisterByEmail(this.registerForm.value).subscribe(
      (data) => {
        console.log(data);
        this.showLoader = false; 
        // console.log(this.registerForm)
        
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.showLoader = false; 
        // console.log(this.registerForm)
      }
    );
  }
}