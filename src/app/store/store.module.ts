import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';

@NgModule({
  imports: [StoreModule.forFeature('carwash', reducers), EffectsModule.forFeature([])],
})

export class CarWashStoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CarWashStoreModule){
        if (parentModule){
            throw new Error('CarWashStoreModule has already been loaded. Import Core Modules in the AppModule only.')
        }
    }
}
