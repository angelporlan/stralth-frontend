import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoutineComponent } from './new-routine.component';

describe('NewRoutineComponent', () => {
  let component: NewRoutineComponent;
  let fixture: ComponentFixture<NewRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
