import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { formatTime } from '../helper/format-time';
import { PlayList } from '../models/play-list';
import { READY_STATES } from '../helper/ready-states';
import { NETWORK_STATES } from '../helper/network-states';

@Component({
  selector: 'ngx-audio-control',
  templateUrl: './ngx-audio-control.component.html',
  styleUrls: ['./ngx-audio-control.component.scss']
})
export class NgxAudioControlComponent {
  player = new Audio();
  isReady = false;
  isPaused = true;
  isMuted = false;
  seekValue = 0;
  speedDisplay = '1x';
  currentAudioIndex = 0;
  audioFiles: PlayList[] = [];
  @Input() set fileList(value: string[]) {
    const files = value ?? [];
    this.audioFiles = [];
    for (let item of files) {
      this.audioFiles.push({
        fileAddress: item,
        title: (item.replace(/\\/g, '/').split(/\//g).pop()) ?? 'no name'
      });
    }
    this.initialize();
  }



  currentTime = '00:00';
  totalTime = '00:00';
  options = {
    emptyListMessage: 'No any record'
  };
  showPlayList = false;

  initialize() {
    this.speedDisplay = '1x';
    this.seekValue = 0;
    this.isPaused = true;
    this.isMuted = false;
    this.currentTime = '00:00';
    this.totalTime = '00:00';
    this.player = new Audio();
    if (this.audioFiles.length > 0) {
      this.player.src = this.audioFiles[this.currentAudioIndex].fileAddress;
    } else {
      this.player.src = '';
    }
    this.player.currentTime = 0;
    this.player.preload = 'auto';
    this.player.disableRemotePlayback = false;

    this.player.addEventListener('timeupdate', () => this.updateSeekSlider());
    this.player.addEventListener('loadedmetadata', () => this.onLoadMetaData());
    this.player.addEventListener('loadeddata', () => this.onLoadData());
    this.player.addEventListener('ended', () => this.playNext());
    this.player.addEventListener('oncanplaythrough', (ev) => this.oncanplaythrough(ev));

  }

  oncanplaythrough(ev: any) {
    console.log('oncanplaythrough', ev);
  }


  playPause() {
    if (this.player.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.player.play();
    this.isPaused = false;
  }

  pause() {
    this.player.pause();
    this.isPaused = true;
  }



  muteUnmute() {
    if (this.player.muted) {
      this.player.muted = false;
    } else {
      this.player.muted = true;
    }
    this.isMuted = this.player.muted;
  }

  updateSeekSlider() {
    this.seekValue = (this.player.currentTime / this.player.duration) * 100;
    this.currentTime = formatTime(this.player.currentTime);
  }

  onLoadMetaData() {
    this.totalTime = formatTime(this.player.duration);
  }

  onLoadData() {
    this.totalTime = formatTime(this.player.duration);
    console.log('state', READY_STATES[this.player.readyState.toString()]);
    console.log('Playback stalled due to network issues.', NETWORK_STATES[this.player.networkState]);

  }

  seekAudio(ev: Event) {
    let value = (ev.target as any).value;
    this.player.currentTime = (value / 100) * this.player.duration;
  }

  increaseSpeed() {
    this.player.playbackRate += 0.1;
    this.speedDisplay = `${this.player.playbackRate.toFixed(1)}x`;
  }

  decreaseSpeed() {
    if (this.player.playbackRate > 0.1) {
      this.player.playbackRate -= 0.1;
      this.speedDisplay = `${this.player.playbackRate.toFixed(1)}x`;
    }
  }

  changeVolume(ev: Event) {
    let value = (ev.target as any).value;
    this.player.volume = value;
  }
  previous() {
    this.currentAudioIndex--;
    if (this.currentAudioIndex < 0) {
      this.currentAudioIndex = this.audioFiles.length - 1;
    }
    this.initialize();
    this.play();
  }

  next() {
    this.currentAudioIndex++;
    if (this.currentAudioIndex >= this.audioFiles.length) {
      this.currentAudioIndex = 0;
    }
    this.initialize();
    this.play();
  }


  playNext() {
    this.next();
  }

  onClickPlayList(index: number) {
    this.currentAudioIndex = index;
    this.initialize();
    this.play();
  }



}
