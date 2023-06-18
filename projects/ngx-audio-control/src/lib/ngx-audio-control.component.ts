import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-audio-control',
  templateUrl: './ngx-audio-control.component.html',
  styleUrls: ['./ngx-audio-control.component.scss']
})
export class NgxAudioControlComponent {
  @ViewChild('player', { static: true }) player!: ElementRef<HTMLAudioElement>;
  isPaused = false;
  isMuted = false;
  seekValue = 0;
  seekMax = 0;
  seekMin = 0;
  speedDisplay = '1x';
  currentAudioIndex = 0;
  audioFiles: string[] = [];
  playerFile = '';
  playPause() {
    if (this.player.nativeElement.paused) {
      this.player.nativeElement.play();
    } else {
      this.player.nativeElement.pause();
    }
    this.isPaused = !this.isPaused;
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
  }

  seekAudio(ev: Event) {
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
    this.player.nativeElement.src = this.audioFiles[this.currentAudioIndex];
    this.player.nativeElement.play();
  }

  next() {
    this.currentAudioIndex++;
    if (this.currentAudioIndex >= this.audioFiles.length) {
      this.currentAudioIndex = 0;
    }
    this.player.nativeElement.src = this.audioFiles[this.currentAudioIndex];
    this.player.nativeElement.play();
  }


  playNext() {

  }

}
