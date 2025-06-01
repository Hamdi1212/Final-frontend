import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEquipementComponent } from './detail-equipement.component';

describe('DetailEquipementComponent', () => {
  let component: DetailEquipementComponent;
  let fixture: ComponentFixture<DetailEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
