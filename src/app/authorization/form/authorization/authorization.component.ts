import {ChangeDetectionStrategy, Component, effect, input, Input, OnInit, Signal} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {toSignal} from '@angular/core/rxjs-interop';
import {NgIf} from '@angular/common';
import {AppDirectiveModule} from '../../../../../common/directive/app-directive.module';
import { flush } from '../../../../../common/utility/flush.util';
import {RxLet} from '@rx-angular/template/let';
import {RxIf} from '@rx-angular/template/if';

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
    RxLet,
    RxIf,
  ],
  selector: 'authorization',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit {

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
