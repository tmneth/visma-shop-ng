import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.view.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(
    private readonly http: HttpClient,
    private errorService: ErrorService
  ) {
    const token = localStorage.getItem('token');
    this.authenticated.next(!!token);
  }

  private authenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.authenticated.asObservable();
  private apiUrl = 'http://localhost:3000/api/auth';

  signup(user: User): Observable<User> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.authenticated.next(true);
        }
      }),
      catchError(this.errorService.handleError.bind(this.errorService))
    );
  }

  signin(user: User): Observable<User> {
    return this.http.post(`${this.apiUrl}/signin`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.authenticated.next(true);
        }
      }),
      catchError(this.errorService.handleError.bind(this.errorService))
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.authenticated.next(false);
  }
}
