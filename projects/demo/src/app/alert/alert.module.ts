import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertRoutingModule } from './alert-routing.module';
import { NgxAlertModalModule } from 'projects/ngx-alert-modal/src/public-api';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    AlertRoutingModule,
    NgxAlertModalModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class AlertModule { }
