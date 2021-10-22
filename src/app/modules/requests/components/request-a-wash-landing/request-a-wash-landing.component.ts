import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderNames } from '../../../../layout/models/enums/header-names';
import { HeaderSectionService } from '../../../../layout/services/header-section.service';
import { RequestService } from '../../services/requests.services';

@Component({
  selector: 'app-request-a-wash-landing',
  templateUrl: './request-a-wash-landing.component.html',
  styleUrls: ['./request-a-wash-landing.component.scss']
})
export class RequestAWashLandingComponent implements OnInit {

  requests: any = [];

  constructor(private headerSectionService: HeaderSectionService,
    private requestService: RequestService,
    private router: Router) { }

  ngOnInit(): void {
    this.headerSectionService.setHeader(HeaderNames.RequestAWash);
    this.getMyRequest();
  }

  getMyRequest(): void {
    this.requestService
      .getRequests()
      .subscribe(
        (response) => {
          this.requests = response;
          this.requests = this.requests?.filter(r => r.currentUser === true);
          if(this.requests.length > 0)
            this.router.navigateByUrl('requests/request-a-wash-pending')
        }
      );
  }

}
