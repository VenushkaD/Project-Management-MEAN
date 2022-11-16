import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { API_URL } from '../const';
import { AppState } from '../store/app.reducer';
import { User } from './user.model';
import { Login } from './store/auth.actions';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = true;
  errorMessage = new Subject<string>();
  constructor(
    private http: HttpClient,
    private route: Router,
    private store: Store<AppState>
  ) {}

  getAuthenticationStatus() {
    return this.isAuthenticated;
  }

  getErrorMessageListener(): Observable<string> {
    return this.errorMessage.asObservable();
  }

  login(user: User) {
    this.http
      .post<{ msg: string; user: User; token: string }>(
        API_URL + '/auth/login',
        {
          ...user,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const error = new Error(err.error.msg);
          this.errorMessage.next(error.message);
          return throwError(() => err.error.msg);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.store.dispatch(Login({ user: res.user, token: res.token }));
        this.addToLocalStorage(res.user, res.token);
        this.route.navigate(['/']);
      });

    // this.http
    //   .post<{ msg: string; user: User; token: string }>(
    //     API_URL + '/auth/login',
    //     {
    //       ...user,
    //     }
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.store.dispatch(Login({ user: res.user, token: res.token }));
    //     this.addToLocalStorage(res.user, res.token);
    //     this.route.navigate(['/']);
    //   });
  }

  register(user: User) {
    this.http
      .post<{ msg: string; user: User; token: string }>(
        API_URL + '/auth/register',
        {
          ...user,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const error = new Error(err.error.msg);
          this.errorMessage.next(error.message);
          return throwError(() => error);
        }),
        tap((resData) => {
          console.log(resData);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.store.dispatch(Login({ user: res.user, token: res.token }));
        this.addToLocalStorage(res.user, res.token);
        this.route.navigate(['/']);
      });

    // this.http
    //   .post<{ msg: string; user: User; token: string }>(
    //     API_URL + '/auth/register',
    //     {
    //       ...user,
    //     }
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.store.dispatch(Login({ user: res.user, token: res.token }));
    //       this.addToLocalStorage(res.user, res.token);
    //       this.route.navigate(['/']);
    //     },
    //     error: (err) => {
    //       console.log('error', err.error.msg);
    //       this.errorMessage = err.error.msg;
    //     },
    //     complete: () => {
    //       console.log('Completed');
    //     },
    //   });
  }

  addToLocalStorage(user: User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  }

  autoLogin() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user && !token) {
      return;
    }
    const userParsed = JSON.parse(localStorage.getItem('user')!);
    const tokenParsed = JSON.parse(localStorage.getItem('token')!);
  }
}
