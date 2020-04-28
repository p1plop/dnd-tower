import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../dialogs/message/message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  formSubmit() {
    const data = this.form.value;
    this.loading = true;
    this.authService.signInWithLoginPassword(data.login, data.password).subscribe(user => {
      this.loading = false;
      if (typeof user === 'string') {
        this.dialog.open(MessageComponent, {
          data: {title: 'Ошибка', message: this.getErrorMessage(user)}
        });
      } else {
        this.router.navigate(['characters']);
      }
    });
   }

   googleAuth() {
     this.loading = true;
     this.authService.signInWithGoogleAccount().subscribe(user => {
       this.loading = false;
       if (typeof user === 'string') {
        this.dialog.open(MessageComponent, {
          data: {title: 'Ошибка', message: this.getErrorMessage(user)}
        });
      } else {
        this.router.navigate(['characters']);
      }
     });
   }

   getErrorMessage(code: string) {
     switch (code) {
       case 'auth/wrong-password':
         return 'Логин или пароль указаны не верно';

        case 'auth/too-many-requests':
          return 'Было отправлено слишком много запросов, повторите вход позже';

        case 'auth/user-not-found':
          return 'Пользователь с таким почтовым адресом не найден';

        default:
          return 'Неизвестная ошибка';
     }
   }

}
