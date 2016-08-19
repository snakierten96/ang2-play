import { Routes, RouterModule } from '@angular/router';

import { CrisisCenterComponent }  from './crisis-center.component';
import { CrisisListComponent }    from './crisis-list.component';
import { CrisisDetailComponent }  from './crisis-detail.component';
import { CrisisAdminComponent }   from './crisis-admin.component';

import { AuthGuard } from '../auth-guard.service';

const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      { 
        path: 'admin',
        component: CrisisAdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: CrisisDetailComponent
      },
      { 
        path: '',
        component: CrisisListComponent
      }
    ]
  }
];

export const crisisCenterRouting = RouterModule.forChild(crisisCenterRoutes);