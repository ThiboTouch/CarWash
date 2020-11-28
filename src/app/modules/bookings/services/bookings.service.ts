import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { BookingStatuses } from '../../../core/domain/enums/booking-status.enum';
import { Booking } from '../../../core/domain/models/booking.model';
import { CarWash } from '../../../core/domain/models/car-wash.model';
import { Product } from '../../../core/domain/models/product.model';
import { BookingsApiService } from './bookings-api.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class BookingsService {
  constructor(
    private bookingsApiService: BookingsApiService,
    private datepipe: DatePipe
  ) {}

  public addBooking(
    product: Product,
    carWash: CarWash,
    bookings: Booking[],
    currentUser = false
  ): Observable<any> {
    const booking = {
      currentUser,
      notes: '',
      status: BookingStatuses.Enqueued,
      product,
      code: Math.random().toString(36).slice(2),
    } as Booking;

    this.setTimes(bookings, carWash, booking);
    return this.bookingsApiService.newBooking(booking);
  }

  private setTimes(
    bookings: Booking[],
    carWash: CarWash,
    booking: Booking
  ): void {
    const activeWashes = bookings.filter(
      (b) => b.status === BookingStatuses.Active
    )?.length;

    const lastBooking = bookings.sort((a, b) =>
      a.position < b.position ? 1 : -1
    )[0];

    booking.position =
      lastBooking === null || lastBooking === undefined
        ? 1
        : lastBooking.position + 1;

    if (activeWashes < carWash.slots) {
      this.calculateTimeWhenSlotsAvailable(booking, carWash.distance);
    } else {
      this.calculateTimeWhenSlotsUnAvailable(
        lastBooking,
        booking,
        carWash.distance
      );
    }
  }

  private calculateTimeWhenSlotsAvailable(
    booking: Booking,
    distance: number
  ): void {
    const currentTime = new Date();
    if (booking.currentUser) {
      currentTime.setMinutes(currentTime.getMinutes() + distance);
    } else {
      currentTime.setMinutes(currentTime.getMinutes());
    }
    booking.timeIn = this.datepipe.transform(currentTime, 'HH:mm');
    currentTime.setMinutes(
      currentTime.getMinutes() + booking.product.estimatedTime
    );
    booking.estimatedTimeOut = this.datepipe.transform(currentTime, 'HH:mm');
  }

  private calculateTimeWhenSlotsUnAvailable(
    lastBooking: Booking,
    booking: Booking,
    distance: number
  ): void {
    const dummyDateString =
      '2020-01-01T' + lastBooking.estimatedTimeOut + ':00';
    const dateObject = new Date(dummyDateString);

    if (booking.currentUser) {
      dateObject.setMinutes(dateObject.getMinutes() + distance);
    } else {
      dateObject.setMinutes(dateObject.getMinutes());
    }

    booking.timeIn = this.datepipe.transform(dateObject, 'HH:mm');
    dateObject.setMinutes(
      dateObject.getMinutes() + booking.product.estimatedTime
    );
    booking.estimatedTimeOut = this.datepipe.transform(dateObject, 'HH:mm');
  }

  updateQueueWhenCancelledOrDeletedOrDone(booking: Booking): Observable<any> {
    let queue: Booking[];
    return this.bookingsApiService.getBookings().pipe(
      map((bookings) => {
        queue = bookings
          .filter(
            (b) =>
              b.status !== BookingStatuses.Cancelled &&
              b.status !== BookingStatuses.Done &&
              b.position > booking.position
          )
          .sort((a, b) => 0 - (a.position > b.position ? -1 : 1));
        return this.updatePositionsAndTimes(queue, booking);
      })
    );
  }

  private updatePositionsAndTimes(
    queue: Booking[],
    booking: Booking
  ): void {
    let min = 0;
    if (queue.length > 0) {
      min = this.getDifferenceBetweenTwoTimes(booking.timeIn, queue[0].timeIn);
      if (booking.status === BookingStatuses.Done) {
        queue[0].status = BookingStatuses.Active;
        min = 0;
      }
    }
    if (
      booking.status === BookingStatuses.Cancelled ||
      booking.status === BookingStatuses.Done
    ) {
      this.bookingsApiService.updateBooking(booking).toPromise();
    } else {
      this.bookingsApiService.deleteBooking(booking.id).toPromise();
    }

    for (const item of queue) {
      item.position = item.position - 1;

      const timeIn = new Date('2020/01/01 ' + item.timeIn);
      timeIn.setMinutes(timeIn.getMinutes() - min);
      item.timeIn = this.datepipe.transform(timeIn, 'HH:mm');

      const timeOut = new Date('2020/01/01 ' + item.estimatedTimeOut);
      timeOut.setMinutes(timeOut.getMinutes() - min);
      item.estimatedTimeOut = this.datepipe.transform(timeOut, 'HH:mm');

      this.bookingsApiService.updateBooking(item).toPromise();
    }
  }

  private getDifferenceBetweenTwoTimes(start: string, end: string): number {
    const startTime = new Date('2020/01/01 ' + start);
    const endTime = new Date('2020/01/01 ' + end);
    const difference = endTime.getTime() - startTime.getTime();
    return Math.round(difference / 60000);
  }
}
