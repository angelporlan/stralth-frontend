import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineBoxComponent } from './routine-box.component';

describe('RoutineBoxComponent', () => {
  let component: RoutineBoxComponent;
  let fixture: ComponentFixture<RoutineBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutineBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
