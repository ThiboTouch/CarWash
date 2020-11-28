
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-management-dialog',
  templateUrl: './product-management-dialog.component.html',
  styleUrls: ['./product-management-dialog.component.scss']
})
export class ProductManagementDialogComponent  {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ProductManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.setContent();
    }

  ngOnInit(): void {
  }
  
  setContent() : void{
    if(this.data?.name !== undefined){
      this.title = 'Confirm Booking';
      this.message = 'Are you sure you want to book '+this.data.name+'?';
    }
    else{
      this.title = 'Confirm Delete';
      this.message = 'Are you sure you want to delete '+this.data+'?';
    }
  }
  onNoClick(answer: boolean): void {
    this.dialogRef.close(answer);
  }

}
