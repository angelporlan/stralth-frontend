import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {

  @Input() dialogTitle: string = '';
  @Input() dialogText: string = '';
  @Output() closeDialog = new EventEmitter<void>();
  @Output() confirmDialog = new EventEmitter<void>();
  

  close() {
    this.closeDialog.emit();
  }

  confirm() {
    this.confirmDialog.emit();
  }

}
