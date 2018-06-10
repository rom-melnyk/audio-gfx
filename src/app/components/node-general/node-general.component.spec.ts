import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGeneralComponent } from './node-general.component';

describe('NodeGeneralComponent', () => {
  let component: NodeGeneralComponent;
  let fixture: ComponentFixture<NodeGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
