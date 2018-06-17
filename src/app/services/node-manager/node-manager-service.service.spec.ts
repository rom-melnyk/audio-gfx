import { TestBed, inject } from '@angular/core/testing';

import { NodeManagerService } from './node-manager.service';

describe('NodeManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeManagerService]
    });
  });

  it('should be created', inject([NodeManagerService], (service: NodeManagerService) => {
    expect(service).toBeTruthy();
  }));
});
