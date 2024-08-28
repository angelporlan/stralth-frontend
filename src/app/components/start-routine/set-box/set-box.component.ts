import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-box',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './set-box.component.html',
  styleUrls: ['./set-box.component.css']
})
export class SetBoxComponent {
  @Input() setNumber!: number;
  @Input() weight: number | null = null;
  @Input() reps: number | null = null;

  @Output() weightChange = new EventEmitter<number | null>();
  @Output() repsChange = new EventEmitter<number | null>();
  @Output() deleteSet = new EventEmitter<void>();

  onWeightChange(value: number | null) {
    this.weightChange.emit(value);
  }

  onRepsChange(value: number | null) {
    this.repsChange.emit(value);
  }

  onDeleteSet() {
    this.deleteSet.emit();
  }
}
