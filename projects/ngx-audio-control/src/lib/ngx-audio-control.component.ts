import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { formatTime } from '../helper/format-time';
import { PlayList } from '../models/play-list';

@Component({
  selector: 'ngx-audio-control',
  templateUrl: './ngx-audio-control.component.html',
  styleUrls: ['./ngx-audio-control.component.scss']
})
export class NgxAudioControlComponent {
  @ViewChild('player', { static: true }) player!: ElementRef<HTMLAudioElement>;
  isReady = false;
  isPaused = false;
  isMuted = false;
  seekValue = 0;
  seekMax = 0;
  seekMin = 0;
  speedDisplay = '1x';
  currentAudioIndex = 0;
  playerFile = '';
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
    this.currentAudioIndex = 0;
    this.speedDisplay = '1x';
    this.seekValue = 0;
    this.seekMax = 0;
    this.seekMin = 0;
    this.isPaused = false;
    this.isMuted = false;
    this.currentTime = '00:00';
    this.totalTime = '00:00';
    if (this.audioFiles.length > 0) {
      this.playerFile = this.audioFiles[0].fileAddress;
    } else {
      this.playerFile = '';
    }

  }




  playPause() {
    if (this.player.nativeElement.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.player.nativeElement.play();
    this.isPaused = false;
  }
  pause() {
    this.player.nativeElement.pause();
    this.isPaused = true;
  }



  muteUnmute() {
    if (this.player.nativeElement.muted) {
      this.player.nativeElement.muted = false;
    } else {
      this.player.nativeElement.muted = true;
    }
    this.isMuted = !this.isMuted;
  }

  updateSeekSlider() {
    this.seekValue = (this.player.nativeElement.currentTime / this.player.nativeElement.duration) * 100;
    this.currentTime = formatTime(this.player.nativeElement.currentTime);
  }
  onLoadMetaData() {
    this.totalTime = formatTime(this.player.nativeElement.duration);
  }
  seekAudio(ev: Event) {
    debugger
    let value = (ev.target as any).value;
    this.player.nativeElement.currentTime = (value / 100) * this.player.nativeElement.duration;
  }

  increaseSpeed() {
    this.player.nativeElement.playbackRate += 0.1;
    this.speedDisplay = `${this.player.nativeElement.playbackRate.toFixed(1)}x`;
  }

  decreaseSpeed() {
    if (this.player.nativeElement.playbackRate > 0.1) {
      this.player.nativeElement.playbackRate -= 0.1;
      this.speedDisplay = `${this.player.nativeElement.playbackRate.toFixed(1)}x`;
    }
  }

  changeVolume(ev: Event) {
    let value = (ev.target as any).value;
    this.player.nativeElement.volume = value;
  }
  previous() {
    this.currentAudioIndex--;
    if (this.currentAudioIndex < 0) {
      this.currentAudioIndex = this.audioFiles.length - 1;
    }
    this.playerFile = this.audioFiles[this.currentAudioIndex].fileAddress;
    this.play();
  }

  next() {
    this.currentAudioIndex++;
    if (this.currentAudioIndex >= this.audioFiles.length) {
      this.currentAudioIndex = 0;
    }
    this.playerFile = this.audioFiles[this.currentAudioIndex].fileAddress;
    this.play();
  }


  playNext() {

  }







  readystatechange() {
    console.log('state', this.player.nativeElement.readyState);
  }
  stalled() {
    console.log('Playback stalled due to network issues.', this.player.nativeElement.networkState);
  }
}
