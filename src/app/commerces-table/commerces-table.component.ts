import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, merge, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Commerce } from '../store/models/Commerce';
import { GlobalState } from '../store/states/global.states';
import {
  selectAllCommerces,
  selectIsLoading as areCommercessLoading,
  selectError,
} from '../store/selectors/commerces.selectors';
import { loadingCommerces } from '../store/actions/commerces.actions';

@Component({
  selector: 'commerces-table',
  standalone: true,
  imports: [MatSortModule, MatPaginatorModule, MatTableModule, CommonModule],
  templateUrl: './commerces-table.component.html',
  styleUrl: './commerces-table.component.css',
})
export class CommercesTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedCols: string[] = [
    'id',
    'color',
    'department',
    'material',
    'product_name',
    'price_string',
    'promo_code',
  ];
  public commercesCount: number = 0;
  public noData: Commerce[] = [<Commerce>{}];
  dataSource = new MatTableDataSource(this.noData);
  public loading: boolean = true;
  public defaultSort: Sort = { active: 'product_name', direction: 'asc' };

  public error$?: Observable<boolean>;
  private subscription: Subscription = new Subscription();

  constructor(public store: Store<GlobalState>) {}

  public ngOnInit(): void {
    // apply selector for commerces in store
    this.store
      .pipe(select(selectAllCommerces))
      .subscribe((commerces) => this.initializeData(commerces));

    // apply selector for loading state
    this.subscription.add(
      this.store.pipe(select(areCommercessLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource.data = this.noData;
        }
        this.loading = loading;
      })
    );

    this.error$ = this.store.pipe(select(selectError));
  }

  private initializeData(commerces: Commerce[]): void {
    this.dataSource = new MatTableDataSource(
      commerces.length ? commerces : this.noData
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.commercesCount = commerces.length;
  }

  public ngAfterViewInit(): void {
    this.loadCommerces();

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(sort$, this.paginator.page)
        .pipe(tap(() => this.loadCommerces()))
        .subscribe()
    );
  }

  private loadCommerces(): void {
    this.store.dispatch(
      loadingCommerces({
        params: {
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          sortDirection: this.sort.direction,
          sortField: this.sort.active,
        },
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadCommerces();
  }
}
