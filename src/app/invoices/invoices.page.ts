import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Invoice} from '../typing/Invoice';
import {isEmpty} from 'lodash';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss']
})
export class InvoicesPage implements OnInit, OnDestroy {
  public invoices: Invoice[] = [];
  private unsubscribe$ = new Subject<void>();

  public constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public ngOnInit(): void {
    this.init();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public doInfiniteScroll(infiniteScroll): void {
    if (isEmpty(this.invoices)) {
      infiniteScroll.target.complete();
      return;
    }
    const lastId = this.invoices[this.invoices.length - 1].id;
    this.getInvoices(lastId)
      .subscribe(invoices => {
        this.invoices.push(...invoices);
        infiniteScroll.target.complete();
      });
  }

  public doRefresh(refresher): void {
    this.init(refresher.target.complete);
  }

  private init(cb?: Function): void {
    this.getInvoices()
      .subscribe(invoices => {
        this.invoices = invoices;
        if (cb) {
          cb();
        }
      });
  }

  private getInvoices(lastId?: number): Observable<Invoice[]> {
    return this.apiService.getInvoices(lastId)
      .pipe(
        takeUntil(this.unsubscribe$)
      );
  }
}
