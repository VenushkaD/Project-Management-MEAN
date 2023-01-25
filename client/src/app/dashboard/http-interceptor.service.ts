import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + user.token
          ),
        });

        return next.handle(modifiedReq);
      })
    );
    return next.handle(request);
  }
}
