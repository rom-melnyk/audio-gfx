import { Component, OnInit } from '@angular/core';
import { AudioFileService } from '../services/audio-file-service/audio-file-service.service';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
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
