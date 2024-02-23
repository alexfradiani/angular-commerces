import { CommercesState, initialCommercesState } from './commerces.states';

export interface GlobalState {
  commerces: CommercesState;
}

export const initialGlobalState: GlobalState = {
  commerces: initialCommercesState,
};
