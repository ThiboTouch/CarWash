import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../../../core/domain/models/product.model';

@Injectable({
  providedIn: 'any',
})
export class RequestProductApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRequestProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/request-products`);
  }

}
