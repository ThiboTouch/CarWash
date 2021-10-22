import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../modules/material/material.module';
import { HeaderSectionComponent } from './components/header-section/header-section.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, HeaderSectionComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule
  ]
})
export class LayoutModule { }
