import { TestBed, inject } from '@angular/core/testing';

import { AudioFileService } from './audio-file.service';

describe('AudioFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioFileService]
    });
  });

  it('should be created', inject([AudioFileService], (service: AudioFileService) => {
    expect(service).toBeTruthy();
  }));
});
