import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurd implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router, private userService: UserService) {
  }

  canActivate() {

    return this.auth.appUser$
      .pipe(map(appUser => {
        if (appUser.isAdmin) {
          return true;
        } else {
          this.router.navigate(['access-denied']);
        }
      }));
  }

}
