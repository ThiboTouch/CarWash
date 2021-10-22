import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import ApiKeys from '../../../../config/ApiKeys.json';
import { HeaderNames } from '../../../../layout/models/enums/header-names';
import { HeaderSectionService } from '../../../../layout/services/header-section.service';
import { RequestService } from '../../services/requests.services';
import { Request } from '../../../../core/domain/models/request-wash.model';
import { Router } from '@angular/router';
import { RequestStatuseDetails } from '../../../../core/domain/enums/request-status.enum';
import { RequestWashDialogComponent } from '../request-wash-dialog/request-wash-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-a-wash-pending',
  templateUrl: './request-a-wash-pending.component.html',
  styleUrls: ['./request-a-wash-pending.component.scss'],
})
export class RequestAWashPendingComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    zoomControl: false,
    streetViewControl: false
  };

  myRequest = {} as Request;
  statusDescription: string = '';

  constructor(httpClient: HttpClient, private headerSectionService: HeaderSectionService,
    private requestService: RequestService, private dialog: MatDialog,private snackBar: MatSnackBar,
    private router: Router) {
    this.apiLoaded = httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${ApiKeys.googleMapsAPIKey}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    this.headerSectionService.setHeader(HeaderNames.RequestDetails);
    this.getRequests();
  }

  openSnackBar(message: string): void {
    let s = this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }


  getRequests(): void {
    this.requestService
      .getRequests()
      .subscribe(
        (response) =>
          {
            this.myRequest = response.filter(r => r.currentUser === true)[0];
            this.getStatusDescription(this.myRequest.statusDetails);
          }
      );  
  }

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(RequestWashDialogComponent, {
      width: '100%',
      data: action
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        if(action === 'CANCEL')
          action = 'CANCELED';
        this.cancelRequest();
        this.openSnackBar('Request was '+action.toLowerCase()+' successfully');
      }
    });
  }

  cancelRequest(){
    this.requestService
      .deleteRequest(this.myRequest.id)
      .subscribe(
        (response) => {
          (this.router.navigateByUrl('requests/request-a-wash-landing'))
        }
    );
  }

  getStatusDescription(status: string): void{
    switch(status){
      case  RequestStatuseDetails.Coming: this.statusDescription = 'Your car wash is on the way';
      break;
      case  RequestStatuseDetails.Arrived: this.statusDescription = 'Your car wash has arrived';
      break;
      case  RequestStatuseDetails.Started: this.statusDescription = 'Your car is being washed';
      break;
      case  RequestStatuseDetails.Ended: this.statusDescription = 'Your car has been washed';
      break;
      case  RequestStatuseDetails.Cancelled: this.statusDescription = 'Your car wash was cancelled';
      break;
      default: this.statusDescription = 'Waiting for the service provider to accept';
    }
  }
}

