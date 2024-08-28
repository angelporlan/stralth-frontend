import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRoutineComponent } from './start-routine.component';

describe('StartRoutineComponent', () => {
  let component: StartRoutineComponent;
  let fixture: ComponentFixture<StartRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
