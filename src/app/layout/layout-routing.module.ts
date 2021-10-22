import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'landing-menu',
        pathMatch: 'full',
      },
      {
        path: 'landing-menu',
        loadChildren: () =>
          import('../modules/landing-menu/landing-menu.module').then(
            (m) => m.LandingMenuModule
          ),
      },
      {
        path: 'management',
        loadChildren: () =>
          import('../modules/management/management.module').then(
            (m) => m.ManagementModule
          ),
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('../modules/bookings/bookings.module').then(
            (m) => m.BookingsModule
          ),
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('../modules/requests/requests.module').then(
            (m) => m.RequestsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
