import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMobileMenu = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleMobileMenuHome(): void {
    if (this.showMobileMenu) {
      this.showMobileMenu = !this.showMobileMenu;
    }
  }

  isActive(instruction: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
