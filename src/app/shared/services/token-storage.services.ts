import {Injectable, signal} from '@angular/core';
import {User} from '../../features/auth/models/auth.model';

@Injectable(
  {providedIn: 'root'}
)
export class TokenStorageService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'authUser';

  currentUser = signal<User | null>(null);

  constructor() {
    const user = this.getUser();
    if (user) {
      this.currentUser.set(user);
    }
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  getUser(): User | null {
    const user =  localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
  }
}
