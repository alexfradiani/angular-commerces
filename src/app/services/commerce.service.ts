import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Commerce,
  CommercesParams,
  CommercesResponse,
} from '../store/models/Commerce';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommerceService {
  private apiUrl = 'https://random-data-api.com/api/commerce/random_commerce';
  constructor(private http: HttpClient) {}

  // Perform http request according to params from table component
  public getCommerces(params: CommercesParams): Observable<CommercesResponse> {
    // TODO: incldude size query parameter: ?size=100
    const options = { params: new HttpParams().set('size', 100) };
    return this.http
      .get<Commerce[]>(this.apiUrl, options)
      .pipe(map((commerces: Commerce[]) => ({ commerces: commerces })));
  }
}
