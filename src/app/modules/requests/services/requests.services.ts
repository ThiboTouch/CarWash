import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Request } from '../../../core/domain/models/request-wash.model';
import { Product } from '../../../core/domain/models/product.model';
import { RequestStatuseDetails, RequestStatuses } from '../../../core/domain/enums/request-status.enum';
import { RequestApiService } from './request-api.services';

@Injectable({
  providedIn: 'any',
})
export class RequestService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private requestApiServer: RequestApiService) {}

  requestWash(requestProduct: Product): Observable<any> {
    let request = {} as Request;
    this.generateRequest(requestProduct, request);

    return this.requestApiServer.addRequest(request);
  }

  deleteRequest(id: number): Observable<any>{
    return this.requestApiServer.deleteRequest(id);
  }

  updateRequest(request: Request):Observable<any>{
    return this.requestApiServer.updateRequest(request);
  }

  getRequests(): Observable<Request[]>{
      return this.requestApiServer.getRequests();
  }

  private generateRequest(requestProduct: Product, request: Request): void{
      request.currentUser = true;
      request.serviceProviderCompany = "Mobile Washers";
      request.serviceProviderName = "Bongani Mzolo";
      request.status = RequestStatuses.Incoming;
      request.statusDetails = RequestStatuseDetails.Await;
      request.product = requestProduct;
      request.customer = "Lethabo Mbokazi";
      request.location = "252 Montrose Avenue, Northgate 2162";
      request.distance = "15km";
  }

}
