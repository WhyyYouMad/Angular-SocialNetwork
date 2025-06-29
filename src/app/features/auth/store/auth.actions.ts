import {createAction, props} from '@ngrx/store';
import {AuthModel, UserInfo} from '../models/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<AuthModel>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<UserInfo>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<AuthModel>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<UserInfo>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
