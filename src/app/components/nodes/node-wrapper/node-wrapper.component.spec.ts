import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeWrapperComponent } from './node-wrapper.component';

describe('NodeWrapperComponent', () => {
  let component: NodeWrapperComponent;
  let fixture: ComponentFixture<NodeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
