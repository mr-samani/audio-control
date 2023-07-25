import { Component, OnInit } from '@angular/core';
import { NgxAlertModalService } from 'projects/ngx-alert-modal/src/public-api';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  constructor(
    private alert: NgxAlertModalService
  ) {

  }


  ngOnInit(): void {


  }


  openModal() {
    this.alert.fire({
      title: '404',
      text: 'test',
      icon: 'success',
      showCancelButton: true,
      showDenyButton: true,
      showConfirmButton: true
    }).then(result => {

    });
  }
}
