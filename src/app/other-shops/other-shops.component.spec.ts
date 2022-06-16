import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherShopsComponent } from './other-shops.component';

describe('OtherShopsComponent', () => {
  let component: OtherShopsComponent;
  let fixture: ComponentFixture<OtherShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherShopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
