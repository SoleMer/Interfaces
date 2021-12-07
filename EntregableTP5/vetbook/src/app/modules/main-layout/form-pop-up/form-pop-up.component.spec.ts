import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPopUpComponent } from './form-pop-up.component';

describe('FormPopUpComponent', () => {
  let component: FormPopUpComponent;
  let fixture: ComponentFixture<FormPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
