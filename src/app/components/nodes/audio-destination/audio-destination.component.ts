import { Component, OnInit, Input } from '@angular/core';
import { AudioDestinationNodeComplex } from '../../../models/audio-destination-node-complex';

@Component({
  selector: 'app-audio-destination',
  template: `
    <div class="audio-destination" [class.is-playing]="isPlaying"></div>
  `,
  styleUrls: ['./audio-destination.component.scss']
})
export class AudioDestinationComponent implements OnInit {
  @Input() isPlaying = false;
  @Input() nodeComplex: AudioDestinationNodeComplex;

  constructor() { }

  ngOnInit() {
  }

}
