import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';
import {selectIsAuthenticated} from '../../features/auth/store/auth.selectors';

export const authGuards: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/auth']);
        return false;
      }
      return true;
    })
  );
}
