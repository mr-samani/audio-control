import { Component } from '@angular/core';
import { AlertOptions } from './options';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'lib-ngx-alert-modal',
  templateUrl: 'ngx-alert-modal.component.html',
  styleUrls: ['./ngx-alert-modal.component.scss']
})
export class NgxAlertModalComponent {
  options!: AlertOptions;
  index = 0;

  private readonly _onClose = new Subject<number>();
  public onClose = this._onClose.asObservable();

  onConfirm() {

  }


  close() {
    this._onClose.next(this.index);
  }
}
