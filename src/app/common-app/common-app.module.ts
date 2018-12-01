import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { DetailRowComponent } from './detail-row/detail-row.component';

@NgModule({
  declarations: [HeaderComponent, DetailRowComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [HeaderComponent, DetailRowComponent]
})
export class CommonAppModule { }
