import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueueManagementDialogComponent } from '../queue-management-dialog/queue-management-dialog.component';
import { QueueActions } from '../../models/enums';
import { HeaderSectionService } from '../../../../layout/services/header-section.service';
import { HeaderNames } from '../../../../layout/models/enums/header-names';
import { BookingsApiService } from '../../../bookings/services/bookings-api.service';
import { Booking } from '../../../../core/domain/models/booking.model';
import { Subscription } from 'rxjs';
import { BookingStatuses } from '../../../../core/domain/enums/booking-status.enum';
import { CarWash } from '../../../../core/domain/models/car-wash.model';
import { CarWashApiService } from '../../../bookings/services/car-wash-api.service';
@Component({
  selector: 'app-manage-queue',
  templateUrl: './manage-queue.component.html',
  styleUrls: ['./manage-queue.component.scss'],
})
export class ManageQueueComponent implements OnInit, OnDestroy {
  dataSource: Booking[];
  carWash: CarWash;

  displayedColumns: string[] = [
    'position',
    'timeIn',
    'estimatedTimeOut',
    'product',
    'code',
    'actions',
  ];
  subscriptions: Subscription[] = [];

  bookingStatus = BookingStatuses;
  action = QueueActions;
  panelOpenState = false;

  constructor(
    private dialog: MatDialog,
    private headerSectionService: HeaderSectionService,
    private bookingsApiService: BookingsApiService,
    private carWashApiService: CarWashApiService
  ) {}

  get isSlotAvailable(): boolean {
    const activeWashes = this.dataSource.filter(
      (b) => b.status === BookingStatuses.Active
    )?.length;

    if (activeWashes < this.carWash?.slots) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.headerSectionService.setHeader(HeaderNames.ManageQueue);

    this.carWashApiService
      .getCarWashes()
      .subscribe((carWashes) => (this.carWash = carWashes[0]));

    this.getBookings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getBookings(): void {
    this.subscriptions.push(
      this.bookingsApiService.getBookings().subscribe((bookings) => {
        this.dataSource = bookings.filter(
          (b) =>
            b.status !== BookingStatuses.Cancelled &&
            b.status !== BookingStatuses.Done
        );
      })
    );
  }

  openDialog(action: QueueActions, booking: Booking): void {
    const dialogRef = this.dialog.open(QueueManagementDialogComponent, {
      width: '100%',
      data: { action, booking },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (action !== this.action.Notes && result) {
        this.getBookings();
      }
    });
  }
}
