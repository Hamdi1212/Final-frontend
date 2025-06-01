import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistcComponent } from './statistc.component';

describe('StatistcComponent', () => {
  let component: StatistcComponent;
  let fixture: ComponentFixture<StatistcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
