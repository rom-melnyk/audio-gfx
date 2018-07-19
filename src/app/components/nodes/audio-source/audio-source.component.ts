import { Component, OnInit, Input } from '@angular/core';
import { AudioSourceNodeComplex } from '../../../models/audio-source-node-complex';

@Component({
  selector: 'app-audio-source',
  template: `
    <div class="player">
      <app-file-selector (audioFileSelected)="onAudioFile($event);"></app-file-selector>
      <app-audio-player [audioFile]="audioFile"></app-audio-player>
    </div>
  `,
})
export class AudioSourceComponent implements OnInit {
  @Input() node: AudioSourceNodeComplex;
  public audioFile = '';

  constructor() { }

  onAudioFile(file: string) {
    this.audioFile = file;
  }

  ngOnInit() {
  }

}
