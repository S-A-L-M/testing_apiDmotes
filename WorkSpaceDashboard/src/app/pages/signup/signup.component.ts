import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterOutlet, MatFormFieldModule, MatIconModule, MatInputModule,MatButtonModule,HttpClientModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ]
})

export class SignupComponent implements OnInit {
  loginObj: Login;
  showLoader: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  ngOnInit(): void {}

  onLogin() {
    const url = 'http://10.10.1.28:5000/api/login';
    const body = { correo: this.loginObj.EmailId, password: this.loginObj.Password };
    this.showLoader = true; 



    this.http.post(url, body, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        catchError(error => {
          console.error(error);
          this.showLoader = false; 
          alert('Error: ¡Whoops! El usuario o la contraseña incorrectos(s).');
          
          return throwError(error);
          
        })
      )
      .subscribe(
        (response: any) => {
          if (response.sesion === 'Valida' && response.Token) {
            const token = response.Token;
            localStorage.setItem('token', token);
            this.obtenerDatos(token);
          } else {
            console.error('Credenciales inválidas');
            alert('Error: ¡Whoops! El usuario o la contraseña incorrectos(s).');
          }
        }
      );
  }
  // Obtener autorización en la API tenant Events pasandole cómo Authorization bearer el Token
  obtenerDatos(token: string) {
    const url = 'http://10.10.1.28:5000/api/TenantEvents';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(url, { headers })
      .pipe(
        catchError(error => {
          console.error(error);
          alert('Error500: ¡Ha ocurrido un error en el servidor. Intente más tarde.');
          return throwError(error);
        })
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigateByUrl('/dashboard');
        }
      );
  }
}

export class Login {
  EmailId: string;
  Password: string;

  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}


  // * * * * * *Primer CÓDIGO DE AYUDA * * * * * *

  // httpClient = inject(HttpClient);
  // data: any[] = [];

  // ngOnInit(): void {
  //   this.fetchData();
  // }

  // fetchData() {
  //   this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/posts')
  //     .pipe(
  //       catchError((error) => {
  //         console.error(error);
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //       this.data = data;
  //     });
  // }


  // * * * * * *SEGUNDO CÓDIGO DE AYUDA * * * * * *

//   loginObj: Login;

//   constructor(private http: HttpClient) {
//     this.loginObj = new Login();
//   }

//   onLogin() {
//     debugger;
//     this.http.post('http://10.10.1.28:5000/api/save_users', this.loginObj).subscribe((res:any)=>{
//       if(res.result) {
//         alert("Login Success");
//         // localStorage.setItem('angular17token', res.data.token)
//       } else {
//         alert(res.message)
//       }
//     })
//   }
// }

// export class Login { 
//     EmailId: string;
//     Password: string;
//     constructor() {
//       this.EmailId = '';
//       this.Password = '';
//     } 
    

//   }
