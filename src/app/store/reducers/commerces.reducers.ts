import { createReducer, on } from '@ngrx/store';
import { initialCommercesState } from '../states/commerces.states';
import {
  loadCommercesError,
  loadCommercesSuccess,
  loadingCommerces,
} from '../actions/commerces.actions';

export const commercesReducer = createReducer(
  initialCommercesState,
  on(loadingCommerces, (state) => ({ ...state, loading: true })),
  on(loadCommercesSuccess, (state, { response }) => ({
    ...state,
    error: false,
    loading: false,
    commerces: response.commerces,
  })),
  on(loadCommercesError, (state) => ({
    ...state,
    error: true,
    loading: false,
    commerces: [],
  }))
);
