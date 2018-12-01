import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-row',
  templateUrl: './detail-row.component.html',
  styleUrls: ['./detail-row.component.scss']
})
export class DetailRowComponent implements OnInit {
  @Input()
  public label: string;

  @Input()
  public value: string;

  constructor() { }

  ngOnInit() {
  }

}
