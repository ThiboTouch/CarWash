import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CarWash } from '../../../core/domain/models/car-wash.model';

@Injectable({
  providedIn: 'any',
})
export class CarWashApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCarWashes(): Observable<CarWash[]> {
    return this.http.get<CarWash[]>(
      `${this.baseUrl}/car-washes`
    );
  }

  getCarWash(id: number): Observable<CarWash> {
      return this.http.get<CarWash>(`${this.baseUrl}/car-washes/${id}`);
  }
}
