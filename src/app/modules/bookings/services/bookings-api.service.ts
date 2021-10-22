import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Booking } from '../../../core/domain/models/booking.model';

@Injectable({
  providedIn: 'any',
})
export class BookingsApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/carWashBookings`);
  }

  deleteBooking(id: number): Observable<Booking> {
    return this.http.delete<Booking>(`${this.baseUrl}/carWashBookings/${id}`);
  }

  newBooking(model: any): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/carWashBookings`, model);
  }

  updateBooking(model: any): Observable<Booking> {
    return this.http.put<Booking>(
      `${this.baseUrl}/carWashBookings/${model.id}`,
      model
    );
  }
}
