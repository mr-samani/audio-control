import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { formatTime } from '../helper/format-time';
import { PlayList } from '../models/play-list';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'ngx-audio-control',
  templateUrl: './ngx-audio-control.component.html',
  styleUrls: ['./ngx-audio-control.component.scss']
})
export class NgxAudioControlComponent {
  private _audioContext = new AudioContext();
  private _buffer: AudioBuffer | null = null; // AudioBuffer
  private _source: AudioBufferSourceNode | undefined; // AudioBufferSourceNode
  private _playbackTime = 0; // time of the audio playback, seconds

  isPaused = true;
  gainNode!: GainNode;
  updateCurrentTimeInterval: any;
  loading = false;

  isReady = false;
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



  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {

  }




  initialize(startAfterLoad = false) {
    this.speedDisplay = '1x';
    this.seekValue = 0;
    this.isMuted = false;
    this.currentTime = '00:00';
    this.totalTime = '00:00';
    this.stop();
    if (this.audioFiles.length > 0) {
      this.loading = true;
      this.http.get(this.audioFiles[this.currentAudioIndex].fileAddress, {
        responseType: 'arraybuffer'
      })
        .pipe(finalize(() => this.loading = false))
        .subscribe(response => {
          // for legacy browsers
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          this._audioContext = new AudioContext();

          this._audioContext.decodeAudioData(response, (buffer) => {
            this._buffer = buffer;
            if (startAfterLoad)
              this.play();
            this.totalTime = formatTime(this._buffer.duration);
            if (this.updateCurrentTimeInterval) {
              clearInterval(this.updateCurrentTimeInterval);
            }
            this.updateCurrentTimeInterval = setInterval(() => this.updateSeekSlider(), 1000);
          },
            (err) => {
              console.error(
                `Unable to get the audio file: ${this.audioFiles[this.currentAudioIndex].fileAddress} Error: ${err.message}`
              );
            });

        });
    }
  }



  playPause() {
    if (this.isPaused) {
      this.play();
    } else {
      this.stop();
    }
  }

  play(offset = 0) {
    this.gainNode = this._audioContext.createGain();
    this._source = this._audioContext.createBufferSource();
    this._source.buffer = this._buffer;
    this._source.loop = false;
    // this._source.onended = this.onEnded()
    this._source.connect(this.gainNode);
    this.gainNode.connect(this._audioContext.destination);
    this._source.start(0, offset);
    this.isPaused = false;
  }

  stop() {
    if (this._source) {
      this._source.stop();
      this.isPaused = true;
    }
  }



  muteUnmute() {
    if (this.isMuted) {
      this.gainNode.gain.value = 0;
    } else {
      this.gainNode.gain.value = this.gainNode.gain.maxValue;
    }
    this.isMuted = !this.isMuted;
  }

  updateSeekSlider() {
    if (!this.isPaused && this._buffer) {
      //this.seekValue = (this._audioContext.currentTime / this._buffer.duration) * 100;
      this.currentTime = formatTime(this._audioContext.currentTime);
      this.changeDetector.detectChanges();
    }
  }



  seekAudio(ev: Event) {
    debugger
    if (this._source && this._buffer) {
      var seekTime = this._buffer.duration * ((ev.target as any).value / 100);
      if (!this.isPaused)
        this.stop();
      this.play(seekTime);
    }
  }

  increaseSpeed() {
    // this._buffer.playbackRate.value += 0.1;
    //this.speedDisplay = `${this._buffer.playbackRate.value.toFixed(1)}x`;
  }

  decreaseSpeed() {
    // if (this._buffer.playbackRate.value > 0.1) {
    //   this._buffer.playbackRate.value -= 0.1;
    //   this.speedDisplay = `${this._buffer.playbackRate.value.toFixed(1)}x`;
    // }
  }

  changeVolume(ev: Event) {
    let value = (ev.target as any).value;
    this.gainNode.gain.value = value;
  }
  previous() {
    this.currentAudioIndex--;
    if (this.currentAudioIndex < 0) {
      this.currentAudioIndex = this.audioFiles.length - 1;
    }
    debugger
    this.initialize(true);
  }

  next() {
    this.currentAudioIndex++;
    if (this.currentAudioIndex >= this.audioFiles.length) {
      this.currentAudioIndex = 0;
    }
    debugger
    this.initialize(true);
  }


  playNext() {
    debugger
    this.next();
  }

  onClickPlayList(index: number) {
    debugger
    this.currentAudioIndex = index;
    this.initialize(true);
  }



}
