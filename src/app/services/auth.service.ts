import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { from,  Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private snackbar: MatSnackBar
    ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.afAuth.user.subscribe(user => {
      this._saveUser(user);
    });
  }

  signInWithLoginPassword(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password).catch(error => {
      return error.code;
    })).pipe(tap(credentials => {
      this._saveUser(credentials.user);
    }));
  }

  signInWithGoogleAccount(): Observable<firebase.auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider).catch(error => {
      return error.code;
    })).pipe(tap(credentials => {
      this._saveUser(credentials.user);
    }));
  }

  registerUserWithLoginPassword(email: string, password: string) {
    return from(auth().createUserWithEmailAndPassword(email, password).catch(error => {
      return error.code;
    })).pipe(tap(credentials => {
      this.snackbar.open('Добро пожаловать!', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      this._saveUser(credentials.user);
    }));
  }

  logout() {
    from(this.afAuth.signOut()).subscribe(_ => {
      this._saveUser(null);
      this.router.navigate(['']);
    });
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  private _saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }
}
