import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private signUp = false;

  constructor(private router: Router) {}

  get signUpMode(): boolean {
    return this.signUp;
  }

  ngOnInit(): void {}

  toggleSignUpMode(): void {
    this.signUp = !this.signUp;
  }

  navigate(): void {
    this.router.navigateByUrl('landing-menu');
  }
}
