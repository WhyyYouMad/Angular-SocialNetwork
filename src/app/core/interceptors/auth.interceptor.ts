import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenStorageService} from '../../shared/services/token-storage.services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const token = tokenStorage.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
