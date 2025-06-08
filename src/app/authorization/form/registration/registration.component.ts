import {ChangeDetectionStrategy, Component, effect, input, Input, OnInit, Signal} from '@angular/core';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { flush } from '../../../../../common/utility/flush.util';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {RxLet} from '@rx-angular/template/let';
import {RxIf} from '@rx-angular/template/if';

@Component({
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatSuffix,
    MatIconButton,
    MatError,
    MatFormField,
    MatIcon,
    NgIf,
    RxLet,
    RxIf,
  ],
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {

  form = input<FormGroup>();
  hidePassword = true;
  hidePasswordConfirm = true;
  matchPasswords = true;

  flush = flush;

  get login() {
    return this.form()?.get('login');
  }

  get password() {
    return this.form()?.get('password');
  }

  get passwordConfirm() {
    return this.form()?.get('passwordConfirm');
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
