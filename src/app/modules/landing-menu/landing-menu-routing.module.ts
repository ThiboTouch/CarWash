import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingMenuComponent } from './landing-menu.component';

const routes: Routes = [{ path: '', component: LandingMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingMenuRoutingModule { }
