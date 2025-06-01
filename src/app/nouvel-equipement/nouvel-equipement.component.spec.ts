import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelEquipementComponent } from './nouvel-equipement.component';

describe('NouvelEquipementComponent', () => {
  let component: NouvelEquipementComponent;
  let fixture: ComponentFixture<NouvelEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
