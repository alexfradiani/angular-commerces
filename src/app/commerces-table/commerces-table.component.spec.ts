import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommercesTableComponent } from './commerces-table.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CommercesTableComponent', () => {
  let component: CommercesTableComponent;
  let fixture: ComponentFixture<CommercesTableComponent>;

  let store: MockStore;
  const initialState = { something: false };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommercesTableComponent, NoopAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CommercesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
