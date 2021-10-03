import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import firebase from 'firebase';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  getUser() {
    return this.afAuth.authState;
  }

  get appUser$() {
    return this.getUser().pipe(switchMap(
      user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      }));
  }
}
