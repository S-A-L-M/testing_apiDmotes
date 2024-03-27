import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin/signin.service';

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
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.showLoader = true;
    if (this.signinForm.invalid) {
      this.showLoader = false;
      return alert('Por favor, completa todos los campos.');
    }

    this.signinService.loginByEmail(this.signinForm.value).subscribe(
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
