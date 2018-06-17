import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudioFileService } from '../../../../services/audio-file/audio-file.service';

@Component({
  selector: 'app-file-selector',
  template: `
    <select class="track-picker" (change)="onFileSelected($event)">
      <option value="" selected="selected">Pick an audio track</option>
      <option *ngFor="let file of audioFiles" value="./assets/audio/{{file}}">{{file | filename}}</option>
    </select>
  `,
  styles: []
})
export class FileSelectorComponent implements OnInit {
  public audioFiles: string[] = [];
  @Output() audioFile = new EventEmitter<string>();

  constructor(
    private audioFileService: AudioFileService
  ) { }

  ngOnInit() {
    this.audioFileService
      .fetch()
      .subscribe((files: string[]) => {
        this.audioFiles = files;
      });
  }

  onFileSelected(e: Event) {
    const file = (<HTMLSelectElement>e.target).value;
    if (file) {
      console.log(`"${file}" picked`);
    } else {
      console.log('No audio file picked');
    }
    this.audioFile.emit(file);
  }
}
