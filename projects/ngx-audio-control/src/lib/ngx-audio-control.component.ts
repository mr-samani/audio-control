import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { formatTime } from '../helper/format-time';
import { PlayList } from '../models/play-list';

@Component({
  selector: 'ngx-audio-control',
  templateUrl: './ngx-audio-control.component.html',
  styleUrls: ['./ngx-audio-control.component.scss']
})
export class NgxAudioControlComponent implements OnInit {
  @Input() playList = true;
  @Input() download = true;
  @Input() fileList: string[] = [];

  downloading = false;

  fileInfo = '';
  speedDisplay = '1x';
  audioFiles: PlayList[] = [];





  currentTime = '00:00';
  totalTime = '00:00';
  options = {
    emptyListMessage: 'No any record'
  };
  showPlayList = false;

  currentAudioIndex = 0;
  currentFileAddress = '';
  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;
  seekSlider = {
    min: 0,
    max: 0,
    value: 0
  };
  buffering = false;
  constructor(
  ) {
  }

  ngOnInit(): void {
    this.audioFiles = [];
    for (let item of this.fileList) {
      this.audioFiles.push({
        fileAddress: item,
        title: (item.replace(/\\/g, '/').split(/\//g).pop()) ?? 'no name'
      });
    }
    this.initialize();


    this.audio.nativeElement.onloadedmetadata = (ev) => {
      this.seekSlider.max = this.audio.nativeElement.duration;
      this.totalTime = formatTime(this.audio.nativeElement.duration);
    };
    this.audio.nativeElement.onloadstart = () => this.buffering = true;
    this.audio.nativeElement.onloadeddata = () => this.buffering = false;
    this.audio.nativeElement.ontimeupdate = () => {
      this.seekSlider.value = this.audio.nativeElement.currentTime;
      this.currentTime = formatTime(this.audio.nativeElement.currentTime);
    };
  }

  initialize(currentAudioIndex = 0, playAfterLoad = false) {
    this.speedDisplay = '1x';
    this.currentTime = '00:00';
    this.totalTime = '00:00';
    this.currentAudioIndex = currentAudioIndex;
    this.currentFileAddress = '';
    this.seekSlider = {
      min: 0,
      max: 0,
      value: 0
    }
    this.stop();
    if (this.audioFiles.length > 0 && this.audioFiles[this.currentAudioIndex]) {
      this.currentFileAddress = this.audioFiles[this.currentAudioIndex].fileAddress;
      this.fileInfo = this.audioFiles[this.currentAudioIndex].title;
      this.audio.nativeElement.load();
    }
    if (playAfterLoad) {
      this.play();
    }
  }



  playPause() {
    if (this.audio.nativeElement.paused) {
      this.play();
    } else {
      this.stop();
    }
  }

  play(offset = 0) {
    this.audio.nativeElement.play();
  }

  stop() {
    this.audio.nativeElement.pause();
  }



  muteUnmute() {
    this.audio.nativeElement.muted = !this.audio.nativeElement.muted;
  }


  seekAudio(ev: Event) {
    const range = ev.target as HTMLInputElement;
    this.audio.nativeElement.currentTime = +range.value;
  }

  increaseSpeed() {
    const delta = 0.25;
    this.audio.nativeElement.playbackRate = Math.max(0.5, this.audio.nativeElement.playbackRate + delta);
    this.speedDisplay = this.audio.nativeElement.playbackRate.toFixed(2) + 'x';
  }

  decreaseSpeed() {
    const delta = -0.25;
    this.audio.nativeElement.playbackRate = Math.max(0.5, this.audio.nativeElement.playbackRate + delta);
    this.speedDisplay = this.audio.nativeElement.playbackRate.toFixed(2) + 'x';
  }

  changeVolume(ev: Event) {
    let value = (ev.target as HTMLInputElement).value;
    this.audio.nativeElement.volume = +value;
  }
  previous() {
    this.currentAudioIndex--;
    if (this.currentAudioIndex < 0) {
      this.currentAudioIndex = this.audioFiles.length - 1;
    }
    this.initialize(this.currentAudioIndex, true);
  }

  next() {
    this.currentAudioIndex++;
    if (this.currentAudioIndex >= this.audioFiles.length) {
      this.currentAudioIndex = 0;
    }
    this.initialize(this.currentAudioIndex, true);
  }


  playNext() {
    this.next();
  }

  onClickPlayList(index: number) {
    this.currentAudioIndex = index;
    this.initialize(this.currentAudioIndex, true);
  }

  downloadCurrentFile() {
    if (!this.currentFileAddress)
      return;
    this.downloading = true;
    var a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = this.currentFileAddress;
    a.download = this.fileInfo;
    a.click();
    window.URL.revokeObjectURL(this.currentFileAddress);
    a.remove();
    setTimeout(() => {
      this.downloading = false;
    }, 1000);
  }

}
