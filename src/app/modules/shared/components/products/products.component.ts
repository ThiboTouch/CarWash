import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  AfterViewChecked,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Booking } from '../../../../core/domain/models/booking.model';
import { Product } from '../../../../core/domain/models/product.model';
import { ProductApiService } from '../../../../modules/management/services/product-api.services';
import { BookingsService } from '../../../../modules/bookings/services/bookings.service';
import { CarWash } from '../../../../core/domain/models/car-wash.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductManagementDialogComponent } from '../../../../modules/management/components/product-management-dialog/product-management-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input()
  carWash: CarWash;
  @Input()
  bookings: Booking[];
  @Input()
  currentUser: boolean;

  selectedProduct: any;

  isDisabled = false;

  @Output()
  bookingAdded: EventEmitter<any> = new EventEmitter();

  products: Product[];

  constructor(
    private productApiServer: ProductApiService,
    private dialog: MatDialog,
    private bookingsService: BookingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bookings?.currentValue !== undefined) {
      this.disableBooking();
    }
  }

  disableBooking(): void {
    if (this.bookings?.filter((a) => a.currentUser === true)?.length > 0) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  getProducts(): void {
    this.productApiServer
      .getProducts()
      .subscribe((response) => (this.products = response));
  }

  newBooking(product: any): void {
    if (
      this.carWash !== null &&
      this.bookings !== null &&
      (!this.currentUser || !this.isDisabled)
    ) {
      this.bookingsService
        .addBooking(product, this.carWash, this.bookings, this.currentUser)
        .subscribe(() => this.bookingAdded.emit(null));
    }
  }

  openDialog(product: any): void {
    this.selectedProduct = product;
    const dialogRef = this.dialog.open(ProductManagementDialogComponent, {
      width: '100%',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newBooking(this.selectedProduct);
        this.openSnackBar('Booking was successfully added');
      }
    });
  }
  openSnackBar(message: string): void {
    let s = this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }
}
