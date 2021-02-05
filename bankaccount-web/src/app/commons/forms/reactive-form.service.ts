import { FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormField } from './form-field.model';

@Injectable({
    providedIn: 'root'
})
export class ReactiveFormService {
    /**
     * The instance of the {FormBuilder} represents the form builder.
     */
    formBuilder: FormBuilder = new FormBuilder();

    /**
     * Initializes a new instance of the {ReactiveFormService}.
     */
    constructor() { }

    /**
     * Creates a form.
     * @param form The instance of the {FormGroup} represents the form.
     * @param formFields The collection of the {FormField} instance represents the form field.
     * @param formBuilder The instance of the {FormBuilder} represents the form builder.
     * @returns The instance of the {FormGroup} represents the form.
     */
    createForm(form: FormGroup, formFields: FormField[]): FormGroup {
        if (!formFields || formFields.length === 0) {
            return form;
        }
        formFields.forEach(field => {
            if (field && field.controlName && field.validators) {
            this.registerControl(form, field.defaultValue, field.controlName, field.validators);
            }
        });
        return form;
    }

    /**
     * Add addtional form fields.
     * @param form The instance of the {FormGroup}.
     * @param formFields The collection of the form fields.
     * @returns The updated instance of the {FormGroup}.
     */
    addFormFields(form: FormGroup, formFields: FormField[]): FormGroup {
        if (!form) {
            throw new Error('Form is null.');
        }
        if (formFields && formFields.length !== 0) {
            formFields.forEach(field => {
                if (field && field.controlName && field.validators) {
                    this.registerControl(form, field.defaultValue, field.controlName, field.validators);
                }
            });
            return form;
        }
        return form;
    }

    /**
     * Removes the form fields from the given form.
     * @param form The instance of the {FormGroup}.
     * @param formFields The collection of form fields.
     */
    removeFormFields(form: FormGroup, formFields: FormField[]): FormGroup {
        if (!form) {
            throw new Error('Form is null.');
        }
        if (formFields && formFields.length !== 0) {
            formFields.forEach(field => {
                if (field && field.controlName) {
                    this.removeControl(form, field.controlName);
                }
            });
            return form;
        }
        return form;
    }

    /**
     * Creates a form field control.
     * @param defaultValue The default value of the form field.
     * @param validators The collection of form field validators.
     */
    createControl(defaultValue: any, validators: ValidatorFn[]): AbstractControl {
        return this.formBuilder.control(defaultValue, validators);
    }

    /**
     * Registers a form control.
     * @param form The instance of the {FormGroup}.
     * @param defaultValue The control default value.
     * @param controlName The control name.
     * @param validators The control validators.
     */
    registerControl(form: FormGroup, defaultValue: any, controlName: string, validators: any[]): void {
        if (!Object.keys(form.controls).includes(controlName)) {
            const control = this.createControl(defaultValue, validators);
            if (!control) { throw new Error('Unable to create a form control.'); }
            this.addControl(form, controlName, control);
        }
    }

    /**
     * Adds a form field control to a form.
     * @param form The instance of the {FormGroup}.
     * @param controlName The form field name.
     * @param control The control.
     */
    addControl(form: FormGroup, controlName: string, control: AbstractControl): void {
        if (!form) { return; }
        form.addControl(controlName, control);
        form.get(controlName)?.updateValueAndValidity();
    }

    /**
     * Removes a control from a form.
     * @param form The instance of the {FormGroup}.
     * @param controlName The control name whose control to be removed.
     */
    removeControl(form: FormGroup, controlName: string): void {
        if (!form) { return; }
        if (Object.keys(form.controls).includes(controlName)) {
            form.removeControl(controlName);
            form.updateValueAndValidity();
        }
    }

    /**
     * Gets the value of a control.
     * @param controlName The control name whose control to be removed.
     * @param form The instance of the {FormGroup}.
     */
    getControlValue(form: FormGroup, controlName: string): any {
        if (!form) { return null; }
        if (!Object.keys(form.controls).includes(controlName)) {
            return null;
        }
        return form.get(controlName)?.value;
    }

    /**
     * Sets a control to a value.
     * @param form The instance of the {FormGroup}.
     * @param controlName The control name whose value will be set.
     * @param value The desired control value.
     * @param options The control options.
     */
    setControlValue(form: FormGroup, controlName: string, value: any, options?: any): void {
        if (!form) { return; }
        const control = form.get(controlName);
        if (control) {
            form.get(controlName)?.setValue(value, options);
            form.get(controlName)?.updateValueAndValidity();
        }
    }

    /**
     * Resets a form.
     * @param form The instance of the {FormGroup} represents a form.
     */
    resetForm(form: FormGroup): void {
        if (form) {
            form.reset();
        }
    }
}
