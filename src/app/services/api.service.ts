import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Invoice} from '../typing/Invoice';
import paths from '../config/paths';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly endpoint = '';

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public getInvoices(lastId: number = 0): Observable<Invoice[]> {
    // return this.httpClient.get<Invoice[]>(`${this.endpoint}${paths.invoice}`);
    return Observable.create(observer => {
      const invoices: Invoice[] = [];

      for (let i = lastId; i < lastId + 20; i++) {
        invoices.push({
          id: i,
          title: 'teasd',
          addedAt: moment().unix(),
          description: '12313',
          guarantyUntil: moment().unix(),
          guarantyYears: 12,
          hasGuaranty: false
        });
      }
      setTimeout(() => {
        observer.next(invoices);
      }, 3000);
    });
  }

  public getInvoice(id: number): Observable<Invoice> {
    // return this.httpClient.get<Invoice>(`${this.endpoint}${paths.invoice}/${id}`);

    return Observable.create(observer => {
      setTimeout(() => {
        observer.next({
          id,
          title: 'teasd',
          addedAt: moment().unix(),
          description: '12313',
          guarantyUntil: moment().unix(),
          guarantyYears: 12,
          hasGuaranty: false
        });
      }, 3000);
    });
  }
}
