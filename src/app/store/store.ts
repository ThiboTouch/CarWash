import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { headerSectionReducer } from './reducers/header-section.reducer';

export interface State {
  headerSection: string;
}

export const reducers: ActionReducerMap<State> = {
  headerSection: headerSectionReducer,
};

export const selectState = createFeatureSelector<State>('carwash');

export const selectHeaderSectionState = createSelector(
  selectState,
  (state: State) => state.headerSection
);

