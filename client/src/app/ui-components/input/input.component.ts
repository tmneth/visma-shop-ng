import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class InputComponent {
  @Input() inputId = '';
  @Input() inputType = '';
  @Input() control = new FormControl();
  @Input() label = '';
  @Input() isRequired = false;

  errorMessages: Record<string, string> = {
    required: 'The field is required',
    email: 'The email is invalid',
    invalidUrl: 'Invalid URL format',
  };
}
