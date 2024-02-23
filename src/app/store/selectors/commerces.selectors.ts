import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommercesState } from '../states/commerces.states';

// A general feature selector for the commerces object in store
export const selectCommercesState =
  createFeatureSelector<CommercesState>('commerces');

// A selector for the actual array of commerces for displaying in table
export const selectAllCommerces = createSelector(
  selectCommercesState,
  (state: CommercesState) => state.commerces
);

// A selector for the loading boolean for commerces
export const selectIsLoading = createSelector(
  selectCommercesState,
  (state: CommercesState) => state.loading
);

// A selector for the error state when loading commerces
export const selectError = createSelector(
  selectCommercesState,
  (state: CommercesState) => state.error
);
