import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player/player.component';
import { NgxAudioControlModule } from 'projects/ngx-audio-control/src/public-api';


@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    NgxAudioControlModule
  ]
})
export class PlayerModule { }
