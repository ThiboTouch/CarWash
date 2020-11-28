import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookAWashComponent } from './components/book-a-wash/book-a-wash.component';
import { BookAWashDetailsComponent } from './components/book-a-wash-details/book-a-wash-details.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DeleteBookingConfirmationDialogComponent } from './components/delete-booking-confirmation-dialog/delete-booking-confirmation-dialog.component';

@NgModule({
  declarations: [
    BookAWashComponent,
    BookAWashDetailsComponent,
    DeleteBookingConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    RatingModule.forRoot(),
    MaterialModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
})
export class BookingsModule {}
