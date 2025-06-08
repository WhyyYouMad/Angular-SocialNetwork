import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationComponent} from './form/registration/registration.component';
import {AuthorizationComponent} from './form/authorization/authorization.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';


@Component({
  standalone: true,
  imports: [
    RegistrationComponent,
    AuthorizationComponent,
    MatTabGroup,
    MatTab,
    MatButton
  ],
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  matchPasswords = true;

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  constructor() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onAuthorization() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (
      !this.password?.value ||
      !this.passwordConfirm?.value ||
      this.password?.value !== this.passwordConfirm?.value
    ) {
      this.matchPasswords = false;
      return;
    }

  }
}
