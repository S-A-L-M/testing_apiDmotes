import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.';
        
        if (error.status === 400) {
          errorMessage = 'O.';
        } else if (error.status === 404) {
          errorMessage = 'El recurso solicitado no fue encontrado.';
          
        } else if (error.status === 500) {
          errorMessage = 'Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.';
        }

        this.showErrorMessage(errorMessage);
        return throwError(() => error);
      })
    );
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}