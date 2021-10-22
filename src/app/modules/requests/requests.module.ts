import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsRoutingModule } from './requests-routing.module';
import { MaterialModule } from '../material/material.module';
import { RequestAWashLandingComponent } from './components/request-a-wash-landing/request-a-wash-landing.component';
import { RequestAWashPendingComponent } from './components/request-a-wash-pending/request-a-wash-pending.component';
import { RequestWashProductsComponent } from './components/request-wash-products/request-wash-products.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RequestWashDialogComponent } from './components/request-wash-dialog/request-wash-dialog.component';

@NgModule({
  declarations: [RequestAWashLandingComponent, RequestAWashPendingComponent, RequestWashProductsComponent, RequestWashDialogComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ]
})
export class RequestsModule { }
