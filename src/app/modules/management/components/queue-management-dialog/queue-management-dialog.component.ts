import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BookingsService } from '../../../bookings/services/bookings.service';
import { BookingStatuses } from '../../../../core/domain/enums/booking-status.enum';
import { BookingsApiService } from '../../../bookings/services/bookings-api.service';
import { QueueActions } from '../../models/enums';

@Component({
  selector: 'app-queue-management-dialog',
  templateUrl: './queue-management-dialog.component.html',
  styleUrls: ['./queue-management-dialog.component.scss'],
})
export class QueueManagementDialogComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  title: string;
  message: string;
  selectedAction: QueueActions;

  notes = new FormControl(this.data.booking.notes);
  action = QueueActions;

  constructor(
    public dialogRef: MatDialogRef<QueueManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private bookingsApiService: BookingsApiService,
    private snackBar: MatSnackBar,
    private bookingsService: BookingsService
  ) {
    this.setContent();
  }

  setContent(): void {
    this.selectedAction = (QueueActions as any)[this.data.action.value];

    switch (this.selectedAction) {
      case QueueActions.Start:
        this.title = 'Start Car Wash';
        this.message = 'Are you sure you want to start the wash?';
        break;
      case QueueActions.Stop:
        this.title = 'Stop Car Wash';
        this.message = 'Are you sure you want to stop the wash?';
        break;
      case QueueActions.Cancel:
        this.title = 'Cancel Car Wash';
        this.message = 'Are you sure you want to cancel the wash?';
        break;
      case QueueActions.Notes:
        this.title = 'Notes';
        break;
      default:
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleAction(): void {
    this.selectedAction = (QueueActions as any)[this.data.action.value];
    switch (this.selectedAction) {
      case QueueActions.Start:
        this.data.booking.status = BookingStatuses.Active;
        this.sendApiRequest(
          'The booking is now active and wash should be started.'
        );
        break;
      case QueueActions.Stop:
        this.data.booking.status = BookingStatuses.Done;
        this.cancelOrDoneBooking(
          'The booking has been completed and removed from the queue.'
        );
        break;
      case QueueActions.Cancel:
        this.data.booking.status = BookingStatuses.Cancelled;
        this.cancelOrDoneBooking(
          'The booking has been cancelled and removed from the queue.'
        );
        break;
      case QueueActions.Notes:
        this.data.booking.notes = this.notes.value;
        this.sendApiRequest('Notes for the booking were successfully updated.');
        break;
      default:
        break;
    }
  }

  sendApiRequest(resultMessage): void {
    this.bookingsApiService.updateBooking(this.data.booking).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar(resultMessage);
    });
  }

  cancelOrDoneBooking(resultMessage): void {
    this.bookingsService
      .updateQueueWhenCancelledOrDeletedOrDone(this.data.booking)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.openSnackBar(resultMessage);
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
