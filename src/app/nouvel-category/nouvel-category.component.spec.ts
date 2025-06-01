import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelCategoryComponent } from './nouvel-category.component';

describe('NouvelCategoryComponent', () => {
  let component: NouvelCategoryComponent;
  let fixture: ComponentFixture<NouvelCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
