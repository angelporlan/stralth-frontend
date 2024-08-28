import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsRoutineComponent } from './stats-routine.component';

describe('StatsRoutineComponent', () => {
  let component: StatsRoutineComponent;
  let fixture: ComponentFixture<StatsRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
