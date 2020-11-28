import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingMenuRoutingModule } from './landing-menu-routing.module';
import { LandingMenuComponent } from './landing-menu.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [LandingMenuComponent],
  imports: [
    CommonModule,
    LandingMenuRoutingModule,
    MaterialModule
  ]
})
export class LandingMenuModule { }
