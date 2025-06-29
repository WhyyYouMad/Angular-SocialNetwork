import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import * as AuthActions from './auth.actions';
import {TokenStorageService} from '../../../shared/services/token-storage.services';
import {ApiService} from '../../../core/services/api.services';
import {AuthModel, UserInfo} from '../models/auth.model';

@Injectable(
  {providedIn: 'root'}
)
export class AuthEffects {

  actions$ = inject(Actions);
  api = inject(ApiService);
  tokenStorage = inject(TokenStorageService);
  router = inject(Router);

  login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap((request: AuthModel) =>
          this.api.post<UserInfo>('/auth/login', new AuthModel(request)).pipe(
            map((userInfo: UserInfo) => AuthActions.loginSuccess(userInfo)),
            catchError((error) =>
              of(AuthActions.loginFailure({error: error.error?.message || 'Login failed'}))
            )
          )
        )
      )
    }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((request: AuthModel) =>
        this.api.post<UserInfo>('/auth/register', new AuthModel(request))
          .pipe(
            map((userInfo: UserInfo) => AuthActions.registerSuccess(userInfo)),
            catchError((error) =>
              of(AuthActions.registerFailure({ error: error.error?.message || 'Registration failed' }))
            )
          )
      )
    )
  );

  authSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap((userInfo: UserInfo) => {
          this.tokenStorage.saveToken(userInfo.token);
          this.tokenStorage.saveUser(userInfo.user);
          this.router.navigate(['/profile']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.tokenStorage.clear();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
