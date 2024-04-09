import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  showLoader = false; 

  constructor(
    private router: Router,
    private _signupservice: SignupService,
    private form: FormBuilder

  ){
    this.signupForm = form.group({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.minLength(8))
    })
  }
  ngOnInit(): void {
      this.signupForm.controls['email'].valueChanges.subscribe();
  }

  onRegister(){
    this._signupservice.RegisterByEmail(this.signupForm.value).subscribe(
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
