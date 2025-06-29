import {User} from '../models/auth.model';

export interface AuthState {
  user: User | null;  // null для начального состояния
  token: string | null;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false
};
