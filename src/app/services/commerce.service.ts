import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Commerce,
  CommercesParams,
  CommercesResponse,
} from '../store/models/Commerce';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommerceService {
  // original random-data service: currently has CORS issues
  // private apiUrl = 'https://random-data-api.com/api/commerce/random_commerce';

  private apiUrl = `${environment.apiUrl}/random_commerce`;
  constructor(private http: HttpClient) {}

  // Perform http request according to params from table component
  public getCommerces(params: CommercesParams): Observable<CommercesResponse> {
    const options = { params: new HttpParams().set('size', params.querySize) };
    return this.http
      .get<Commerce[]>(this.apiUrl, options)
      .pipe(map((commerces: Commerce[]) => ({ commerces: commerces })));
  }
}
