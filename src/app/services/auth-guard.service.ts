import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.getUser().pipe(map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    }));

  }
}
