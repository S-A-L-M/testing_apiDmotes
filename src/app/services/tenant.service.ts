import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private _refresh$ = new Subject<void>();
  URL_API: string = environment.URL_API + 'all/';
  URL_APITENANTS: string = environment.URL_APITenant + 'tenants/';
  token: string= "";
  headers: Headers | any;
  

  constructor(private http: HttpClient) { }

  
  get refresh$(){
    return this._refresh$
  }

  getTokenStorge() {
    this.token = localStorage.getItem('authToken')!;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllTenants(): Observable<any> {
    this.getTokenStorge();
    const URL = this.URL_API + '1/2';
    return this.http.get<any>(URL, { headers: this.headers })
  }

  postTenants(data:any): Observable<any> {
    this.getTokenStorge();
    const URL = this.URL_APITENANTS + '1'
    return this.http.post<any>(URL, data, { headers: this.headers }).pipe(tap(()=> this.refresh$.next()));
  }

  updateTenants(data: any): Observable<any> {
    this.getTokenStorge();
    const URL = `${this.URL_APITENANTS}update/${data.id}`; 
    return this.http.put<any>(URL, data, { headers: this.headers }).pipe(tap(()=> this.refresh$.next()));
  }
  postTenantsEmails(data: any): Observable<any> {
    this.getTokenStorge();
    const URL = this.URL_APITENANTS + 'emails/2';
    return this.http.post<any>(URL, data, { headers: this.headers }).pipe(tap(()=> this.refresh$.next()));
  }
  postTenantsEvents(eventType: string, data: { fecha_ini: string; fecha_fin: string }): Observable<any> {
    this.getTokenStorge();
    const URL = `${this.URL_APITENANTS}events/2/${eventType}`;
    return this.http.post<any>(URL, data, { headers: this.headers }).pipe(tap(() => this.refresh$.next()));
  }
}

  