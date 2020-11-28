import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Request } from '../../../core/domain/models/request-wash.model';

@Injectable({
  providedIn: 'any',
})
export class RequestApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 
  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/request-wash`);
  }

  updateRequest(model: any): Observable<Request> {
    return this.http.put<Request>(
      `${this.baseUrl}/request-wash/` + model.id + '/',
      model
    );
  }

  deleteRequest(id: number): Observable<Request> {
    return this.http.delete<Request>(`${this.baseUrl}/request-wash/` + id + '/');
  }

  addRequest(model: any): Observable<Request> {
    return this.http.post<Request>(`${this.baseUrl}/request-wash`, model);
  }

}
