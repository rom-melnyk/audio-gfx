import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-source',
  template: `
    <div class="player">
      <app-file-selector (audioFileSelected)="onAudioFile($event)"></app-file-selector>
      <app-audio-player [audioFile]="audioFile"></app-audio-player>
    </div>
  `,
})
export class AudioSourceComponent implements OnInit {
  public audioFile = '';

  constructor() { }

  onAudioFile(file: string) {
    this.audioFile = file;
  }

  ngOnInit() {
  }

}
