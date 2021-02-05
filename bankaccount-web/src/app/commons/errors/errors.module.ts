import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FieldErrorComponent } from './field-error/field-error.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule
    ],
    declarations: [
        FieldErrorComponent,
        ErrorComponent
    ],
    exports: [
        FieldErrorComponent,
        ErrorComponent
    ]
})
export class ErrorsModule { }
