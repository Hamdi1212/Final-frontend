import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeplacementComponent } from './list-deplacement.component';

describe('ListDeplacementComponent', () => {
  let component: ListDeplacementComponent;
  let fixture: ComponentFixture<ListDeplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeplacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
