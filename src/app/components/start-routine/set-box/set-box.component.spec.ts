import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBoxComponent } from './set-box.component';

describe('SetBoxComponent', () => {
  let component: SetBoxComponent;
  let fixture: ComponentFixture<SetBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
