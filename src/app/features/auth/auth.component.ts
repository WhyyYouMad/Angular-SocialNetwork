import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import {RegisterComponent} from './form/registration/register.component';
import {LoginComponent} from './form/authorization/login.component';
import {MatTab, MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import * as AuthActions from './store/auth.actions';
import {Store} from '@ngrx/store';

export interface AuthTab {
  tabName: string,
  description: string,
}

@Component({
  standalone: true,
  imports: [
    RegisterComponent,
    LoginComponent,
    MatTabGroup,
    MatTab,
    MatButton,
    NgIf,
    NgForOf,
  ],
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit{

  authTabs: AuthTab[] = [
    { tabName: 'login', description: 'Авторизация'},
    { tabName: 'register', description: 'Регистрация'},
  ];
  currentIndexTab = 0;

  form!: FormGroup;
  registrationConfirm = false;
  timer = 30;
  private timerInterval: any;

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  timerDisplay = '00:30';

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onTabChanges(e: MatTabChangeEvent) {
    this.currentIndexTab = e.index;
    this.form.reset();

    if (this.currentIndexTab === 0) {
      this.passwordConfirm?.clearValidators();
    } else {
      this.passwordConfirm?.setValidators([
        Validators.required,
        this.matchPasswords
      ]);
    }

    this.passwordConfirm?.updateValueAndValidity();
  }

  onAuthorization() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.currentIndexTab === 0) {
      console.log('Авторизирован');
      this.store.dispatch(AuthActions.login(this.form.value));
    }

    if (this.currentIndexTab === 1) {
      console.log('Зарегистрирован');
      this.startTimer();
      this.registrationConfirm = true;
    }

  }

  startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          this.updateTimerDisplay();
        } else {
          this.closeAlert();
        }
        this.cdr.detectChanges();
      }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timer = 30;
    }
  }

  updateTimerDisplay() {
    const seconds = this.timer % 60;
    this.timerDisplay = `00:${seconds.toString().padStart(2, '0')}`;
  }

  closeAlert() {
    this.registrationConfirm = false;
    this.clearTimer();
    this.updateTimerDisplay();
    this.currentIndexTab = 0;
    this.form.reset();
  }

  matchPasswords = (control: AbstractControl): ValidationErrors | null => {
    if (this.currentIndexTab === 0 || !control.value) {
      return null;
    }

    return control.value !== this.password?.value ? { mismatch: true } : null;
  }
}
