import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
})

export class SharedModule {}
