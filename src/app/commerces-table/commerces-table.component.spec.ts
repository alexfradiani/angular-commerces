import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommercesTableComponent } from './commerces-table.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommercesState,
  initialCommercesState,
} from '../store/states/commerces.states';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { GlobalState, initialGlobalState } from '../store/states/global.states';
import { Commerce } from '../store/models/Commerce';
import { selectAllCommerces } from '../store/selectors/commerces.selectors';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

describe('CommercesTableComponent', () => {
  let component: CommercesTableComponent;
  let fixture: ComponentFixture<CommercesTableComponent>;
  let loader: HarnessLoader;

  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommercesTableComponent,
        NoopAnimationsModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        CommonModule,
      ],
      providers: [provideMockStore({ initialState: initialGlobalState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CommercesTableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load random commerces on init', async () => {
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
    store.overrideSelector(selectAllCommerces, commerces);

    store.refreshState();
    component.ngOnInit();
    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(component.commercesCount).toBe(2);
  });
});
