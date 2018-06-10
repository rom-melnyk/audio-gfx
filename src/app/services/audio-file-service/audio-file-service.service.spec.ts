import { TestBed, inject } from '@angular/core/testing';

import { AudioFileServiceService } from './audio-file-service.service';

describe('AudioFileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioFileServiceService]
    });
  });

  it('should be created', inject([AudioFileServiceService], (service: AudioFileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
