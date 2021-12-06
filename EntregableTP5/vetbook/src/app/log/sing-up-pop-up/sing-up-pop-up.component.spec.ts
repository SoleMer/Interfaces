import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpPopUpComponent } from './sing-up-pop-up.component';

describe('SingUpPopUpComponent', () => {
  let component: SingUpPopUpComponent;
  let fixture: ComponentFixture<SingUpPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingUpPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
