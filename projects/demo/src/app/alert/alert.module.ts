import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertRoutingModule } from './alert-routing.module';
import { NgxAlertModalModule } from 'projects/ngx-alert-modal/src/public-api';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    AlertRoutingModule,
    NgxAlertModalModule
  ]
})
export class AlertModule { }
