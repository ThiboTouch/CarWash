import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestStatuseDetails } from '../../../../core/domain/enums/request-status.enum';

@Component({
  selector: 'app-request-wash-dialog',
  templateUrl: './request-wash-dialog.component.html',
  styleUrls: ['./request-wash-dialog.component.scss']
})
export class RequestWashDialogComponent {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<RequestWashDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.setContent();
    }

  ngOnInit(): void {
  }
  
  setContent() : void{
    if(this.data === RequestStatuseDetails.Cancelled){
      this.title = 'Confirm Canceling Request';
      this.message = 'Are you sure you would like to cancell this request?';
    }
    else if(this.data === RequestStatuseDetails.Ended){
      this.title = 'Confirm Ending Request';
      this.message = 'Are you sure you would like to end this request?';
    }
    else if(this.data === RequestStatuseDetails.Started){
      this.title = 'Confirm Start Wash';
      this.message = 'Are you sure you would like to start washing the car?';
    }
    else if(this.data === RequestStatuseDetails.Arrived){
      this.title = 'Confirm Arrival';
      this.message = 'Are you sure you have arrived?';
    }
    else if(this.data === RequestStatuseDetails.Coming){
      this.title = 'Confirm Accepting Request';
      this.message = 'Are you sure you would like to accept the request?';
    }
    else{
      this.title = 'Confirm Request';
      this.message = 'Are you sure you would like to request for a '+this.data+'?';
    }
    
  }
  onNoClick(answer: boolean): void {
    this.dialogRef.close(answer);
  }

}
