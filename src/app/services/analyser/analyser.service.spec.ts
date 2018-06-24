import { TestBed, inject } from '@angular/core/testing';

import { AnalyserService } from './analyser.service';

describe('AnalyserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyserService]
    });
  });

  it('should be created', inject([AnalyserService], (service: AnalyserService) => {
    expect(service).toBeTruthy();
  }));
});
