import { Routes } from '@angular/router';
import {authGuards} from './shared/guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.routesAuth)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.routes').then(m => m.routesProfile),
    canActivate: [authGuards],
  },
];
