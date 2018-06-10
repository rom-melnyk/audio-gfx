import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  template: `
    <audio controls="controls" src={{audioFile}}>
      Your browser does not support the <code>&lt;audio&gt;</code> element.
    </audio>
`,
  styles: [
    'audio { width: 100%; }'
  ]
})
export class AudioPlayerComponent implements OnInit {
  @Input() audioFile = '';

  constructor() { }

  ngOnInit() {
  }

}
