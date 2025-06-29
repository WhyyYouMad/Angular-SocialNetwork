import {ChangeDetectionStrategy, Component, effect, input, OnInit} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {RxIf} from '@rx-angular/template/if';
import { flush } from '../../../../../../common/utility/flush.util';
import {AppDirectiveModule} from '../../../../../../common/directive/app-directive.module';

@Component({
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatInputModule,
    AppDirectiveModule,
    MatIcon,
    MatIconButton,
    NgIf,
    RxIf,
  ],
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  form = input<FormGroup>();
  hidePassword = true;
  matchPasswords = true;

  flush = flush;

  get login() {
    return this.form()?.get('login');
  }

  get password() {
    return this.form()?.get('password');
  }

  constructor() {
    effect(() => {
      if (this.form()) {
        this.matchPasswords = true;
      }
    });
  }

  ngOnInit(): void {
  }

  hasError(control: AbstractControl | null | undefined, error: string) {
    return !!control && control.hasError(error) && control.touched;
  }
}
