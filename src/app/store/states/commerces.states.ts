import { Commerce } from '../models/Commerce';

export interface CommercesState {
  error: boolean;
  loading: boolean;
  commerces: Commerce[];
}

export const initialCommercesState: CommercesState = {
  error: false,
  loading: true,
  commerces: [],
};
