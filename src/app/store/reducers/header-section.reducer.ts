import { createReducer, on } from '@ngrx/store';
import { setHeaderSectionName } from '../actions/header-section.actions';

export const initialState = '';

const internalHeaderSectionReducer = createReducer(
  initialState,
  on(setHeaderSectionName, (state, { headerName }) => {
    state = headerName;
    return state;
  })
);

// tslint:disable-next-line: typedef
export function headerSectionReducer(state: string, action) {
  return internalHeaderSectionReducer(state, action);
}
