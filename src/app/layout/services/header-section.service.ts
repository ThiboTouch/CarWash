import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setHeaderSectionName } from '../../store/actions/header-section.actions';
import { selectHeaderSectionState } from '../../store/store';

@Injectable({
  providedIn: 'any',
})
export class HeaderSectionService {
  constructor(private store: Store) {}

  setHeader(headerName: string): void {
    this.store.dispatch(setHeaderSectionName({ headerName }));
  }

  getHeader(): Observable<string> {
    return this.store.select(selectHeaderSectionState);
  }
}
