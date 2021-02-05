import { Component, Input, OnChanges } from '@angular/core';
import { ErrorMessage } from '../error-message.model';

@Component({
  selector: 'kh-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnChanges {

  @Input() errorMessage: ErrorMessage = new ErrorMessage();

  constructor() { }

  ngOnChanges(): void {
    if (!this.errorMessage) {
      this.errorMessage = new ErrorMessage();
    }
  }

  hasError(): boolean {
    return this.errorMessage?.message?.length !== 0 || false;
  }
}
