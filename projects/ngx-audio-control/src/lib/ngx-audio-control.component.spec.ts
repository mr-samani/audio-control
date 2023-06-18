import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAudioControlComponent } from './ngx-audio-control.component';

describe('NgxAudioControlComponent', () => {
  let component: NgxAudioControlComponent;
  let fixture: ComponentFixture<NgxAudioControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxAudioControlComponent]
    });
    fixture = TestBed.createComponent(NgxAudioControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
