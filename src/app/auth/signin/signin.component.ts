import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
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
      email: ["ejemplo@gmail.com", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    }
      
    )
  }

  ngOnInit(): void {

    

  }

  dataLogin = ()=> {
    return {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    }
  }

  onLogin() {
    this.showLoader = false;
    if (this.form.invalid) 
      return alert('Por favor, completa todos los campos.');
      this.showLoader = true;
    


    this._signinService.loginByEmail(this.dataLogin()).subscribe({
      next: (resp)=> {
        if (resp.token) {
          // console.log("FUnciiono")
          // alert("funcionando")
          this.showLoader = false;
          this._signinService.setToken(resp.token);
          this._router.navigate(['/dashboard'])
        }
      }
    })
      
  }

}
