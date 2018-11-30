import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Invoice} from '../typing/Invoice';
import {isEmpty} from 'lodash';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss']
})
export class InvoicesPage implements OnInit {
  public invoices: Invoice[] = [];

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.init();
  }

  doInfiniteScroll(infiniteScroll): void {
    if (isEmpty(this.invoices)) {
      infiniteScroll.target.complete();
      return;
    }
    const lastId = this.invoices[this.invoices.length - 1].id;
    this.apiService
      .getInvoices(lastId)
      .subscribe(invoices => {
        this.invoices.push(...invoices);
        infiniteScroll.target.complete();
      });
  }

  doRefresh(refresher): void {
    this.init(refresher.target.complete);
  }

  private init(cb?: Function): void {
    this.apiService
      .getInvoices()
      .subscribe(invoices => {
        this.invoices = invoices;
        if (cb) {
          cb();
        }
      });
  }
}
