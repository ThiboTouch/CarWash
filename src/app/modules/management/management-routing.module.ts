import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageQueueComponent } from './components/manage-queue/manage-queue.component';
import { ManageRequestsComponent } from './components/manage-requests/manage-requests.component';

const routes: Routes = [
  {
    path: 'products',
    component: ManageProductsComponent,
  },
  {
    path: 'queue',
    component: ManageQueueComponent,
  },
  {
    path: 'requests',
    component: ManageRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
