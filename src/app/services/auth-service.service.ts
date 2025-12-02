import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../model/model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //   private baseUrl = '/login';

  // constructor(private http: HttpClient) { }

  // login(item: LoginModel):Observable<any>{
  //   return this.http.post(this.baseUrl, item)
  // }

    private baseUrl = '/login'; // backend login endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(item: LoginModel): Observable<{ id: number; email: string; token: string }> {
    return this.http.post<{ id: number; email: string; token: string }>(this.baseUrl, item);
  }



logout() {
  localStorage.removeItem('token');   // remove JWT
  localStorage.removeItem('user');    // remove stored user data (optional)

  // redirect to login
  this.router.navigate(['/login']);
}


  startTokenTimer() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  const expiry = tokenPayload.exp * 1000;
  const timeout = expiry - Date.now();

  setTimeout(() => this.logout(), timeout);
}

}
