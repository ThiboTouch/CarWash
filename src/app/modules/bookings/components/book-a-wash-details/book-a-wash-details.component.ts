import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { CarWash } from '../../../../core/domain/models/car-wash.model';
import { HeaderSectionService } from '../../../../layout/services/header-section.service';
import { CarWashApiService } from '../../services/car-wash-api.service';
import { BookingsApiService } from '../../services/bookings-api.service';
import { Booking } from '../../../../core/domain/models//booking.model';
import { BookingStatuses } from '../../../../core/domain/enums/booking-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookingConfirmationDialogComponent } from '../delete-booking-confirmation-dialog/delete-booking-confirmation-dialog.component';
import { Subscription, timer } from 'rxjs';
import { BookingsService } from '../../../bookings/services/bookings.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';

@Component({
  selector: 'app-book-a-wash-details',
  templateUrl: './book-a-wash-details.component.html',
  styleUrls: ['./book-a-wash-details.component.scss'],
})
export class BookAWashDetailsComponent implements OnInit, OnDestroy {
  carWash: CarWash;
  dataSource: Booking[];
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['position', 'timeIn', 'estimatedTimeOut'];

  status = BookingStatuses;
  includeAction = false;
  panelOpenState = false;

  constructor(
    private headerSectionService: HeaderSectionService,
    private carWashApiService: CarWashApiService,
    private bookingsApiService: BookingsApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams
        .pipe(
          mergeMap((params) => this.carWashApiService.getCarWash(params.id))
        )
        .subscribe((carWash) => {
          this.carWash = carWash;
          this.headerSectionService.setHeader(carWash.name);
        })
    );

    this.getBookings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getBookings(): void {
    this.subscriptions.push(
      this.bookingsApiService.getBookings().subscribe((bookings) => {
        this.includeAction = bookings.find((b) => b.currentUser) !== null;
        this.dataSource = bookings.filter(
          (b) =>
            b.status !== BookingStatuses.Cancelled &&
            b.status !== BookingStatuses.Done
        );
      })
    );
  }

  openDialog(booking: Booking): void {
    const dialogRef = this.dialog.open(
      DeleteBookingConfirmationDialogComponent,
      {
        width: '100%',
        data: { booking },
      }
    );

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getBookings();
        }
      })
    );
  }
}
