import { NgModule } from '@angular/core';
import { NgxAlertModalComponent } from './ngx-alert-modal.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgxAlertModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxAlertModalComponent,
  ]
})
export class NgxAlertModalModule { }
