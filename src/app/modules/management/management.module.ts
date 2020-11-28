import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ManagementRoutingModule } from './management-routing.module';
import { MaterialModule } from '../material/material.module';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageQueueComponent } from './components/manage-queue/manage-queue.component';
import { ManageRequestsComponent } from './components/manage-requests/manage-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueueManagementDialogComponent } from './components/queue-management-dialog/queue-management-dialog.component';
import { ProductManagementDialogComponent } from './components/product-management-dialog/product-management-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ManageProductsComponent,
    ManageQueueComponent,
    ManageRequestsComponent,
    QueueManagementDialogComponent,
    ProductManagementDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagementRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [DatePipe],
})
export class ManagementModule {}
