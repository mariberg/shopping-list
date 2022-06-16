import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSupermarketComponent } from './main-supermarket.component';

describe('MainSupermarketComponent', () => {
  let component: MainSupermarketComponent;
  let fixture: ComponentFixture<MainSupermarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSupermarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSupermarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
