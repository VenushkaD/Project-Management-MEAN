import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('inside auth guard');
    console.log(this.auth.getAuthenticationStatus());

    if (
      !this.auth.getAuthenticationStatus() &&
      !(
        state.url === '/landing' ||
        state.url === '/auth/register' ||
        state.url === '/auth/login'
      )
    ) {
      return this.router.createUrlTree(['/auth/login']);
    }
    if (
      this.auth.getAuthenticationStatus() &&
      (state.url === '/auth/register' || state.url === '/auth/login')
    ) {
      return this.router.createUrlTree(['/']);
    }
    return true;
  }
}
