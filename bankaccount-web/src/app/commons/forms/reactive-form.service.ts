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
     * The instance of the {FormGroup} represents the form.
     */
    form: FormGroup = this.formBuilder.group({});

    /**
     * Initializes a new instance of the {ReactiveFormService}.
     */
    constructor() { }

    /**
     * Initalizes the {ReactiveFormService} represents the reactive form service.
     * @param form The instance of the {FormGroup} represents the form.
     * @param formBuilder The instance of the {FormBuilder} represents the form builder.
     */
    private initializeForm(form: FormGroup, formBuilder: FormBuilder): void {
        this.formBuilder = formBuilder;
        form = this.formBuilder.group({});
        this.form = form;
    }

    /**
     * Creates a form.
     * @param form The instance of the {FormGroup} represents the form.
     * @param formFields The collection of the {FormField} instance represents the form field.
     * @param formBuilder The instance of the {FormBuilder} represents the form builder.
     * @returns The instance of the {FormGroup} represents the form.
     */
    createForm(formBuilder: FormBuilder, form: FormGroup, formFields: FormField[]): FormGroup {
        this.initializeForm(form, formBuilder);
        if (!formFields || formFields.length === 0) {
            return this.form;
        }
        formFields.forEach(field => {
            if (field && field.controlName && field.validators) {
            this.registerControl(field.defaultValue, field.controlName, field.validators);
            }
        });
        return this.form;
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
            this.form = form;
            formFields.forEach(field => {
                if (field && field.controlName && field.validators) {
                    this.registerControl(field.defaultValue, field.controlName, field.validators);
                }
            });
            return this.form;
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
            this.form = form;
            formFields.forEach(field => {
                if (field && field.controlName) {
                    this.removeControl(field.controlName);
                }
            });
            return this.form;
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
     * @param defaultValue The control default value.
     * @param controlName The control name.
     * @param validators The control validators.
     */
    registerControl(defaultValue: any, controlName: string, validators: any[]): void {
        if (!Object.keys(this.form.controls).includes(controlName)) {
            const control = this.createControl(defaultValue, validators);
            if (!control) { throw new Error('Unable to create a form control.'); }
            this.addControl(controlName, control);
        }
    }

    /**
     * Adds a form field control to a form.
     * @param controlName The form field name.
     * @param control The control.
     */
    addControl(controlName: string, control: AbstractControl): void {
        if (!this.form) { return; }
        this.form.addControl(controlName, control);
        this.form.get(controlName)?.updateValueAndValidity();
    }

    /**
     * Removes a control from a form.
     * @param controlName The control name whose control to be removed.
     */
    removeControl(controlName: string): void {
        if (!this.form) { return; }
        if (Object.keys(this.form.controls).includes(controlName)) {
            this.form.removeControl(controlName);
            this.form.updateValueAndValidity();
        }
    }

    /**
     * Gets the value of a control.
     * @param controlName The control name whose control to be removed.
     */
    getControlValue(controlName: string): any {
        if (!this.form) { return null; }
        if (!Object.keys(this.form.controls).includes(controlName)) {
            return null;
        }
        return this.form.get(controlName)?.value;
    }

    /**
     * Sets a control to a value.
     * @param controlName The control name whose value will be set.
     * @param value The desired control value.
     * @param options The control options.
     */
    setControlValue(controlName: string, value: any, options?: any): void {
        if (!this.form) { return; }
        const control = this.form.get(controlName);
        if (control) {
            this.form.get(controlName)?.setValue(value, options);
            this.form.get(controlName)?.updateValueAndValidity();
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
