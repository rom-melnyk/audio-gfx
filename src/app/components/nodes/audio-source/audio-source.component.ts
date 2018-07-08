import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../../models/node-model';
import { IInput, INumberInput } from '../../form-elements/form-config';

@Component({
  selector: 'app-audio-source',
  template: `
    <div class="player">
      <app-file-selector (audioFileSelected)="onAudioFile($event);"></app-file-selector>
      <app-audio-player [audioFile]="audioFile"></app-audio-player>
      <app-form [fields]="fields"></app-form>
    </div>
  `,
})
export class AudioSourceComponent implements OnInit {
  @Input() node: Node;
  public audioFile = '';
  // TODO remove me after experiments
  public fields: { config: IInput, onChange: Function }[] = [
    {
      config: <INumberInput>{
        type: 'number',
        limits: [ 0, 100, 20 ],
        label: 'Your value?'
      },
      onChange: <Function>console.log
    }
  ];

  constructor() { }

  onAudioFile(file: string) {
    this.audioFile = file;
  }

  ngOnInit() {
  }

}
