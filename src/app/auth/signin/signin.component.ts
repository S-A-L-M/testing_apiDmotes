import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  showLoader = false;

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signinService: SigninService,
    private _router: Router
  ) {
    this.form = _fb.group({
      email: ['ejemplo@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  dataLogin = () => {
    return {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };
  };

  onLogin() {
    this.showLoader = true;

    if (this.form.invalid) {
      alert('Por favor, completa todos los campos.');
      this.showLoader = false;
      return;
    }

    this._signinService.loginByEmail(this.dataLogin()).subscribe({
      next: (resp) => {
        if (!resp.token) {
          console.error('El servidor no proporcionó un token válido.');
          // alert('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
          this.showLoader = false;
          return;
        }
        this._signinService.setToken(resp.token);
        this._router.navigate(['/dashboard']);
        this.showLoader = false;
      },
      error: (error: any) => {
        console.error('Ocurrió un error al iniciar sesión:', error);
        // alert(
        //   'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.'
        // );
        this.showLoader = false;
      },
    });
  }
}
