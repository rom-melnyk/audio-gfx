import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../../models/node-model';
import { IBooleanInput, IInput, INumberInput, IRadioInput } from '../../form-elements/input-interfaces';

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
  public fields: IInput[] = [
    <INumberInput>{
      type: 'number',
      limits: [ 0, 100, 20 ],
      label: 'Your <sub>value?</sub>',
      onChange: (x) => console.log(`>>> number ${x}`)
    },
    <IBooleanInput>{
      type: 'boolean',
      onChange: (x) => console.log(`>>> boolean ${x}`),
    },
    <IRadioInput>{
      type: 'radio',
      options: ['asd', 'asdasd', 'wqet qwet', {name: '333', value: -1}],
      onChange: (x) => console.log(`>>> radio ${x}`),
    }
  ];

  constructor() { }

  onAudioFile(file: string) {
    this.audioFile = file;
  }

  ngOnInit() {
  }

}
