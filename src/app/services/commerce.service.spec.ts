import { HttpClient } from '@angular/common/http';
import { CommerceService } from './commerce.service';
import { Commerce, CommercesParams } from '../store/models/Commerce';
import { defer } from 'rxjs';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let commerceSvc: CommerceService;

beforeEach(() => {
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  commerceSvc = new CommerceService(httpClientSpy);
});

describe('Commerce Service', () => {
  it('should return expected commerces', (done: DoneFn) => {
    const commerces: Commerce[] = [
      {
        id: 1,
        uid: '123456789',
        color: 'white',
        department: 'Library',
        material: 'Wood',
        product_name: 'Table',
        price: 100,
        price_string: '100',
        promo_code: 'KAK1000',
      },
      {
        id: 2,
        uid: '987654321',
        color: 'Black',
        department: 'Store',
        material: 'Steel',
        product_name: 'Computer',
        price: 1000,
        price_string: '1000',
        promo_code: 'GNUCGGCC',
      },
    ];

    httpClientSpy.get.and.returnValue(asyncData(commerces));

    const params: CommercesParams = { querySize: 100 };
    commerceSvc.getCommerces(params).subscribe({
      next: (receivedCommerces) => {
        expect(receivedCommerces.commerces)
          .withContext('expected commerces')
          .toEqual(commerces);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});

// Helper function from angular testing:
// https://github.com/angular/angular/blob/main/aio/content/examples/testing/src/testing/async-observable-helpers.ts
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
