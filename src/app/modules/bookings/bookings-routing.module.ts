import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookAWashDetailsComponent } from './components/book-a-wash-details/book-a-wash-details.component';
import { BookAWashComponent } from './components/book-a-wash/book-a-wash.component';

const routes: Routes = [
  { path: 'book-a-wash', component: BookAWashComponent },
  { path: 'book-a-wash-details', component: BookAWashDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
