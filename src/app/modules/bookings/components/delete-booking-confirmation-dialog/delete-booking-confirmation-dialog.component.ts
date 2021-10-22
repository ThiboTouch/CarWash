import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BookingsApiService } from '../../services/bookings-api.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-delete-booking-confirmation-dialog',
  templateUrl: './delete-booking-confirmation-dialog.component.html',
  styleUrls: ['./delete-booking-confirmation-dialog.component.scss'],
})
export class DeleteBookingConfirmationDialogComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<DeleteBookingConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingsService: BookingsService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.bookingsService
      .updateQueueWhenCancelledOrDeletedOrDone(this.data.booking)
      .subscribe(() => {
        this.openSnackBar();

        this.dialogRef.close(true);
      });
  }

  openSnackBar(): void {
    this.snackBar.open(
      'Your booking has been successfully cancelled',
      'Dismiss',
      {
        duration: 5000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      }
    );
  }
}
