import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorsModule } from './errors/errors.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ErrorsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CommonsModule { }
