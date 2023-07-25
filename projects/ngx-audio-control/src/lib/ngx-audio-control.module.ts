import { NgModule } from '@angular/core';
import { NgxAudioControlComponent } from './ngx-audio-control.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NgxAudioControlComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    NgxAudioControlComponent
  ]
})
export class NgxAudioControlModule { }
