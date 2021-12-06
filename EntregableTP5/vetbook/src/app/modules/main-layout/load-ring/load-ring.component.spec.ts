import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadRingComponent } from './load-ring.component';

describe('LoadRingComponent', () => {
  let component: LoadRingComponent;
  let fixture: ComponentFixture<LoadRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
