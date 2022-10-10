import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPComponent } from './trainer-p.component';

describe('TrainerPComponent', () => {
  let component: TrainerPComponent;
  let fixture: ComponentFixture<TrainerPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
