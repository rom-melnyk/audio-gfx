import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NodeManagerService } from '../../../../services/node-manager/node-manager.service';

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

  constructor(
    private audioElement: ElementRef,
    private nodeManager: NodeManagerService
  ) { }

  ngOnInit() {
    // WORKAROUND: <audio> element is created later so we have to initialize AudioSourceNode at this point
    const audioEl = this.audioElement.nativeElement.querySelector('audio');
    this.nodeManager.initNodesChain(audioEl);
  }

}
