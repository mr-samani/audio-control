import { TestBed } from '@angular/core/testing';

import { NgxAudioControlService } from './ngx-audio-control.service';

describe('NgxAudioControlService', () => {
  let service: NgxAudioControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAudioControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
