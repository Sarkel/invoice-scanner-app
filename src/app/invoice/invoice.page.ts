import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {Invoice} from '../typing/Invoice';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit, OnDestroy {
  public invoice: Invoice;
  private unsubscribe$ = new Subject<void>();

  public constructor(
    private readonly router: ActivatedRoute,
    private readonly apiService: ApiService
  ) {
  }

  public ngOnInit() {
    this.router.paramMap
      .pipe(
        switchMap(paramMap => this.apiService.getInvoice(Number(paramMap.get('id')))),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(invoice => this.invoice = invoice);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
