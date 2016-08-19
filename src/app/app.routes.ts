import { Routes, RouterModule }  from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
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

export const appRoutingProviders: any[] = [
  
];

export const routing = RouterModule.forRoot(routes);