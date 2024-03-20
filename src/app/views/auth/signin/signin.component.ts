import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin/signin.service';
import { Token } from 'src/app/models/signin/response';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  showLoader = false;

  constructor(
    private router: Router,
    private signinService: SigninService,
    private formBuilder: FormBuilder
  ) {
    this.signinForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.signinForm.controls['email'].valueChanges.subscribe();
  }

  onLogin() {
    this.showLoader = true;
    this.signinForm.markAllAsTouched();
    this.signinForm.updateValueAndValidity();
  
    if (this.signinForm.invalid) {
      this.showLoader = false;
      return alert('No se logró iniciar sesión debido a datos incorrectos.');
    }
  
    this.signinService.LoginByEmail(this.signinForm.value).subscribe(
      () => {
        this.showLoader = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.showLoader = false;
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }
}
