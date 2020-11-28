import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../requests/services/requests.services';
import { HeaderNames } from '../../../../layout/models/enums/header-names';
import { HeaderSectionService } from '../../../../layout/services/header-section.service';
import { Request } from '../../../../core/domain/models/request-wash.model';
import { RequestStatuseDetails, RequestStatuses } from '../../../../core/domain/enums/request-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { RequestWashDialogComponent } from '../../../requests/components/request-wash-dialog/request-wash-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.scss'],
})
export class ManageRequestsComponent implements OnInit {
  arrived = false;
  started = false;
  ended = false;
  pending = false;
  active = false;
  incoming = false;
  pendingBadge = 0;
  activeBadge = 0;
  incomingBadge = 0;
  requests: Request[];
  

  constructor(private headerSectionService: HeaderSectionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private requestService: RequestService) {}

  ngOnInit(): void {
    this.headerSectionService.setHeader(HeaderNames.ManageRequests);
    this.getMyRequest();
  }

  getMyRequest(): void {
    this.requestService
      .getRequests()
      .subscribe(
        (response) => {
          this.requests = response?.filter(r => r.currentUser === true);
          this.updateBadges();
        }
      );
  }

  private updateBadges(): void{
    this.incomingBadge = 0;
    this.pendingBadge = 0;
    this.activeBadge = 0;
    if(this.requests.filter(r =>r.status === RequestStatuses.Incoming)?.length > 0)
      this.incomingBadge = 1;
    if(this.requests.filter(r =>r.status === RequestStatuses.Pending)?.length > 0)
      this.pendingBadge = 1;
    if(this.requests.filter(r =>r.status === RequestStatuses.Active)?.length > 0)
      this.activeBadge = 1;
  }

  showRequest(request: number): void{
    if(request === 0){
      this.incoming = true;
      this.active = false;
      this.pending = false;
    }
    else if(request === 1){
      this.incoming = false;
      this.active = false;
      this.pending = true;
    }
    else if(request === 2){
      this.incoming = false;
      this.active = true;
      this.pending = false;
    }
  }

  openSnackBar(message: string): void {
    let s = this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }
  
  accept(request: Request): void{
    request.status = RequestStatuses.Active;
    request.statusDetails = RequestStatuseDetails.Coming;
    const dialogRef = this.dialog.open(RequestWashDialogComponent, {
      width: '100%',
      data: RequestStatuseDetails.Coming
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.requestService
          .updateRequest(request)
          .subscribe(
            (response) => {
              this.getMyRequest();
              this.updateBadges();
              this.openSnackBar('Request was accepted successfully');
            }
          );
      }
      else{
        this.getMyRequest();
        this.updateBadges();
      }      
    });
    
  }

  decline(request: Request): void{
    request.statusDetails = RequestStatuseDetails.Cancelled;
    request.status = RequestStatuses.Done;
    const dialogRef = this.dialog.open(RequestWashDialogComponent, {
      width: '100%',
      data: RequestStatuseDetails.Cancelled
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.requestService
        .updateRequest(request)
        .subscribe(
          (response) => {
            this.getMyRequest();
            this.updateBadges();
            this.openSnackBar('Request was declined successfully');
          }
        );
      }
      else{
        this.getMyRequest();
        this.updateBadges();
      }
    });
  }
  
   

  startWash(request: Request): void{
    request.statusDetails = RequestStatuseDetails.Started;
    const dialogRef = this.dialog.open(RequestWashDialogComponent, {
      width: '100%',
      data: RequestStatuseDetails.Started
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.requestService
        .updateRequest(request)
        .subscribe(
          (response) => {
            this.getMyRequest();
            this.updateBadges();
            this.openSnackBar('Wash was started successfully');
          }
        );
      }
      else{
        this.getMyRequest();
        this.updateBadges();
      }
    });
  }
  endWash(request: Request): void{
    request.statusDetails = RequestStatuseDetails.Ended;
    request.status = RequestStatuses.Done;
    const dialogRef = this.dialog.open(RequestWashDialogComponent, {
      width: '100%',
      data: RequestStatuseDetails.Ended
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.requestService
        .updateRequest(request)
        .subscribe(
          (response) => {
            this.getMyRequest();
            this.updateBadges();
            this.openSnackBar('Wash was ended successfully');
          }
        );
      }
      else{
        this.getMyRequest();
        this.updateBadges();
      }
    });
  }
  washArrived(request: Request): void{
    request.statusDetails = RequestStatuseDetails.Arrived;
    const dialogRef = this.dialog.open(RequestWashDialogComponent, {
      width: '100%',
      data: RequestStatuseDetails.Arrived
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.requestService
        .updateRequest(request)
        .subscribe(
          (response) => {
            this.getMyRequest();
            this.updateBadges();
            this.openSnackBar('Wash has arrived successfully');
          }
        );
      }
      else{
        this.getMyRequest();
        this.updateBadges();
      }
    });
  }

}
