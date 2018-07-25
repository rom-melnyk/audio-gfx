import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiquadFilterComponent } from './biquad-filter.component';

describe('BiquadFilterComponent', () => {
  let component: BiquadFilterComponent;
  let fixture: ComponentFixture<BiquadFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiquadFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiquadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
