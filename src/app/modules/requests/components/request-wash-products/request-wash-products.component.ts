import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestWashDialogComponent } from '../request-wash-dialog/request-wash-dialog.component';
import { RequestProductApiService } from '../../services/request-product-api.services';
import { RequestService } from '../../services/requests.services';
import { Product } from '../../../../core/domain/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-wash-products',
  templateUrl: './request-wash-products.component.html',
  styleUrls: ['./request-wash-products.component.scss']
})
export class RequestWashProductsComponent implements OnInit {

  requestProducts: Product[];
  requestProduct = {} as Product;
  

  constructor(private dialog: MatDialog, private router: Router,
    private requestProductApiServer: RequestProductApiService,
    private snackBar: MatSnackBar,
    private requestService: RequestService) { }

  ngOnInit(): void {
    this.getRequestProducts();
  }

  navigate(answer: boolean): void{
    if(answer){
      this.requestService
      .requestWash(this.requestProduct)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('requests/request-a-wash-pending');
          this.openSnackBar('Wash was requested successfully');
        }
      );
    }   
  }
  getRequestProducts(): void {
    this.requestProductApiServer
      .getRequestProducts()
      .subscribe(
        (response) => (
          (this.requestProducts = response)
        )
      );
  }

  openDialog(requestProduct: any): void {
    this.requestProduct = requestProduct;
    const dialogRef = this.dialog.open(RequestWashDialogComponent, {
      width: '100%',
      data: requestProduct.name
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      this.navigate(result);
    });
  }

  openSnackBar(message: string): void {
    let s = this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }

}
