import { Component, Input } from '@angular/core';

@Component({
  selector: 'kh-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent {

  @Input() message: string = '';
  @Input() hasError: boolean = false;

  constructor() { }
}
