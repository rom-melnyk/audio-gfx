import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioSourceComponent } from './audio-source.component';

describe('AudioSourceComponent', () => {
  let component: AudioSourceComponent;
  let fixture: ComponentFixture<AudioSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
