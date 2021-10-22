import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestAWashLandingComponent } from './components/request-a-wash-landing/request-a-wash-landing.component';
import { RequestAWashPendingComponent } from './components/request-a-wash-pending/request-a-wash-pending.component';

const routes: Routes = [
  { path: 'request-a-wash-landing', component: RequestAWashLandingComponent },

  { path: 'request-a-wash-pending', component: RequestAWashPendingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
