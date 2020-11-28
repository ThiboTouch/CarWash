import { Component, OnInit } from '@angular/core';
import { HeaderNames } from '../../layout/models/enums/header-names';
import { HeaderSectionService } from '../../layout/services/header-section.service';

@Component({
  selector: 'app-landing-menu',
  templateUrl: './landing-menu.component.html',
  styleUrls: ['./landing-menu.component.scss']
})
export class LandingMenuComponent implements OnInit {

  constructor(private headerSectionService: HeaderSectionService) { }

  ngOnInit(): void {
    this.headerSectionService.setHeader(HeaderNames.Services);
  }

}
