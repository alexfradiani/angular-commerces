import { createAction, props } from '@ngrx/store';
import { CommercesParams, CommercesResponse } from '../models/Commerce';

// Possible action types for commerces
enum CommercesActionType {
  Loading = '[Commerce] Loading',
  LoadCommercesSuccess = '[Commerce] Load Success',
  LoadCommercesError = '[Commerce] Load Error',
}

// Action for starting to load commerces
export const loadingCommerces = createAction(
  CommercesActionType.Loading,
  props<{ params: CommercesParams }>()
);

// Action when loading the commerces has been successful
export const loadCommercesSuccess = createAction(
  CommercesActionType.LoadCommercesSuccess,
  props<{ response: CommercesResponse }>()
);

// Action when there's an error loading commerces
export const loadCommercesError = createAction(
  CommercesActionType.LoadCommercesError,
  props<{ error: any }>()
);
