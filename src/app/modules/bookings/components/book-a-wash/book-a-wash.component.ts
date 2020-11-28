import { Component, OnInit } from '@angular/core';
import { CarWash } from '../../../../core/domain/models/car-wash.model';
import { HeaderNames } from '../../../../layout/models/enums/header-names';
import { HeaderSectionService } from '../../../../layout/services/header-section.service';
import { CarWashApiService } from '../../services/car-wash-api.service';
@Component({
  selector: 'app-book-a-wash',
  templateUrl: './book-a-wash.component.html',
  styleUrls: ['./book-a-wash.component.scss'],
})
export class BookAWashComponent implements OnInit {
  carWashes: CarWash[];
  ratingMax = 5;
  ratingIsReadonly = true;

  constructor(
    private headerSectionService: HeaderSectionService,
    private carWashApiServer: CarWashApiService
  ) {}

  ngOnInit(): void {
    this.headerSectionService.setHeader(HeaderNames.BookAWash);

    this.carWashApiServer
      .getCarWashes()
      .subscribe(
        (response) =>
          (this.carWashes = response.sort((a, b) =>
            a.distance > b.distance ? 1 : -1
          ))
      );
  }
}
