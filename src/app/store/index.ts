import { ActionReducerMap } from '@ngrx/store';
import { GlobalState } from './states/global.states';
import { commercesReducer } from './reducers/commerces.reducers';

export const reducers: ActionReducerMap<GlobalState> = {
  commerces: commercesReducer,
};
