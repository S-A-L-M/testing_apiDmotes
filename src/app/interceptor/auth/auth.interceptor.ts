import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('authToken')!;
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      .set('Authorization', `Bearer ${authToken}`)

      
    });
    console.log("Trabajandooooo");
    console.log(authToken);
    console.log(request.headers, request.params);
    
    
    // console.log(authToken);
    
    
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log("Ha ocurrido una prohibición");
          // this.router.navigate(['/login']);
        } else {
          return throwError(() => error);
        }
        return throwError(() => error);
      })
    );
  }
}