import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeaderNames } from '../../../../layout/models/enums/header-names';
import { HeaderSectionService } from '../../../../layout/services/header-section.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductManagementDialogComponent } from '../product-management-dialog/product-management-dialog.component';
import { ProductApiService } from '../../services/product-api.services';
import { Product } from '../../../../core/domain/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  name = new FormControl('');
  price = new FormControl(0);
  estimatedTime = new FormControl(0);
  products: Product[];
  product: Product = { id: 0, name: '', estimatedTime: 0, price: 0 };
  showForm = false;
  actionProduct = '';
  selectedProduct: string;
  showDeleteConfirmation = false;
  id: number;
  durationInSeconds = 5;
  numOfProducts: number;

  displayedColumns: string[] = ['name', 'price', 'estimatedTime', 'actions'];

  constructor(
    private dialog: MatDialog,
    private headerSectionService: HeaderSectionService,
    private productApiServer: ProductApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.headerSectionService.setHeader(HeaderNames.ManageProducts);
    this.getProducts();
  }

  getProducts(): void {
    this.productApiServer
      .getProducts()
      .subscribe(
        (response) => (
          (this.products = response),
          (this.numOfProducts = this.products.length)
        )
      );
  }

  displayForm(): void {
    this.showForm = true;
    this.actionProduct = 'Capture Product';
  }

  editProduct(selectedRow: any): void {
    this.name.setValue(selectedRow.name);
    this.price.setValue(selectedRow.price);
    this.estimatedTime.setValue(selectedRow.estimatedTime);
    this.selectedProduct = selectedRow.name;
    this.id = selectedRow.id;
    this.showForm = true;
    this.actionProduct = 'Update Product';
  }

  deleteProduct(flag: boolean): void {
    if (flag) {
      this.productApiServer
        .deleteProduct(this.id)
        .subscribe(
          (response) => (
            this.getProducts(),
            (this.getProducts(),
            this.openSnackBar(
              this.selectedProduct + ' has been deleted successfully'
            ))
          )
        );
    }
  }

  submit(action: string): void {
    if (action === 'Capture Product') {
        this.product.estimatedTime = this.estimatedTime.value;
        this.product.price = this.price.value;
        this.product.name = this.name.value;

        this.productApiServer
        .captureProduct(this.product)
        .subscribe(
          (response) => (
            this.getProducts(),
            this.openSnackBar(this.name.value + ' successfully saved')
          )
        );

    } else {
      this.product.estimatedTime = this.estimatedTime.value;
      this.product.price = this.price.value;
      this.product.name = this.name.value;
      this.product.id = this.id;
      this.productApiServer
        .updateProduct(this.product)
        .subscribe(
          (response) => (
            this.getProducts(),
            this.openSnackBar('Product has been updated successfully')
          )
        );
    }
    this.clearForm();
    this.showForm = false;
  }

  clearForm(): void{
    this.estimatedTime.setValue(0);
    this.price.setValue(0);
    this.name.setValue('');
  }

  openDialog(row: any): void {
    this.selectedProduct = row.name;
    this.id = row.id;
    const dialogRef = this.dialog.open(ProductManagementDialogComponent, {
      width: '100%',
      data: row.name,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.deleteProduct(result);
    });
  }

  openSnackBar(message: string): void {
    let s = this.snackBar.open(message, 'Dismiss', {
      duration: this.durationInSeconds * 1000,
    });
  }

}
