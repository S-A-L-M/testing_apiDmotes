import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoader = false; 

  constructor(
    private router: Router,
    private _loginService: LoginService,
    private form: FormBuilder
  ) {
    this.loginForm = form.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // navigateToRegister(): void {
  // this.router.navigate(['/register']);
  // }

  ngOnInit(): void {
    this.loginForm.controls['email'].valueChanges.subscribe();
    
  }

  onLogin() {
    this.showLoader = true;
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();
  
    if (this.loginForm.invalid) {
      this.showLoader = false;
      return alert('No se logró iniciar sesión debido a datos incorrectos.');
    }
  
    this._loginService.LoginByEmail(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        this.showLoader = false;
        
        // Redirigir al usuario al dashboard
        this.router.navigateByUrl('/dashboard');
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.showLoader = false;
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }
}