import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMvstkEquipementComponent } from './detail-mvstk-equipement.component';

describe('DetailMvstkEquipementComponent', () => {
  let component: DetailMvstkEquipementComponent;
  let fixture: ComponentFixture<DetailMvstkEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMvstkEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMvstkEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
