import { Component, OnInit } from '@angular/core';
import { AudioFileService } from '../../services/audio-file-service/audio-file-service.service';

@Component({
  selector: 'app-file-selector',
  template: `
    <select class="track-picker">
      <option value="" selected="selected">Pick an audio track</option>
      <option *ngFor="let file of audioFiles" value="./assets/audio/{{file}}">{{file | filename}}</option>
    </select>
`,
  styles: []
})
export class FileSelectorComponent implements OnInit {
  public audioFiles: string[] = [];

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
}
