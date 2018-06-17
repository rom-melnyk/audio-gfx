import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioDestinationComponent } from './audio-destination.component';

describe('AudioDestinationComponent', () => {
  let component: AudioDestinationComponent;
  let fixture: ComponentFixture<AudioDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
