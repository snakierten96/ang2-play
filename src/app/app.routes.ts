import { Routes, RouterModule }  from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { loginRoutes,
         authProviders }        from './login.routes';
         
import { CanDeactivateGuard }   from './can-deactivate-guard.serice';

const dashRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule'
  }
];

const appRoutes: Routes = [
  ...loginRoutes,
  ...dashRoutes
];

export const appRoutingProviders: any[] = [
  authProviders,
  CanDeactivateGuard
];

export const routing = RouterModule.forRoot(appRoutes);