import { createAction, props } from '@ngrx/store';

enum HeaderSectionActionTypes {
  SetName = '[Header Section] Set Name',
}

export const setHeaderSectionName = createAction(
  HeaderSectionActionTypes.SetName,
  props<{ headerName: string }>()
);
