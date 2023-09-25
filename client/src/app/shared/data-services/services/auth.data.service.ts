import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.view.model';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(private readonly http: HttpClient) {
    const token = localStorage.getItem('token');
    this.authenticated.next(!!token);
  }

  private authenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.authenticated.asObservable();
  private apiUrl = 'http://localhost:3000/api/auth';

  private handleError(error: any) {
    console.error(error);
    return throwError(() => error);
  }

  public signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.authenticated.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  public signin(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.authenticated.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.authenticated.next(false);
  }
}
