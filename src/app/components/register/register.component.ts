import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../dialogs/message/message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
    this.loading = true;
    const form = this.form.value;
    this.authService.registerUserWithLoginPassword(form.login, form.password).subscribe(user => {
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
      case 'auth/email-already-in-use':
        return 'Пользователь с такой почтой уже зарегистрирован';

       case 'auth/too-many-requests':
         return 'Было отправлено слишком много запросов, повторите попытку позже';

       default:
         return 'Неизвестная ошибка';
    }
  }

}
