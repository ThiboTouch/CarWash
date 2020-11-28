import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderNames } from '../../models/enums/header-names';
import { HeaderSectionService } from '../../services/header-section.service';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss'],
})
export class HeaderSectionComponent implements OnInit {
  heading$: Observable<string>;

  constructor(private headingSectionService: HeaderSectionService) {}

  ngOnInit(): void {
    this.heading$ = this.headingSectionService.getHeader();
  }
}
