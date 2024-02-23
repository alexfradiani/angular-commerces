import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommerceService } from '../../services/commerce.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  loadCommercesError,
  loadCommercesSuccess,
  loadingCommerces,
} from '../actions/commerces.actions';
import { CommercesParams, CommercesResponse } from '../models/Commerce';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CommercesEffects {
  constructor(private actions$: Actions, private service: CommerceService) {}

  /**
   * effect to react to: "loadingCommerces" and map to the
   * success or error actions respectively
   */
  public loadCommerces$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingCommerces),
        switchMap((payload: { params: CommercesParams }) =>
          this.service.getCommerces(payload.params).pipe(
            map((response: CommercesResponse) =>
              loadCommercesSuccess({ response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(loadCommercesError({ error }))
            )
          )
        )
      )
  );
}
