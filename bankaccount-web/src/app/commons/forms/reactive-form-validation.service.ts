import { Injectable } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ReactiveFormValidationService {
    /**
     * The value which indicates whether the operation is in progress.
     */
    inProgress = false;

    /**
     * Initializes new instance the {ReactiveFormValidationService}.
     */
    constructor() { }

    /**
     * Clears control validators from a control.
     * @param form The instance of the {FormGroup} represent the form.
     * @param controlName The control name.
     * @returns The instance of the {FormGroup} represents the form.
     */
    clearControlValidators(form: FormGroup, controlName: string): void {
        if (form && form.contains(controlName)) {
            const control = this.getControl(form, controlName);
            if (control) {
                form.get(controlName)?.clearValidators();
                form.get(controlName)?.updateValueAndValidity();
            }
        }
    }

    /**
     * Sets a control to a collection of validators.
     * @param form The instance of the {FormGroup} represent the form.
     * @param controlName The control name whose validators will be set.
     * @param validators The collection of the control validators.
     */
    setControlValidators(form: FormGroup, controlName: string, validators: any[]): void {
        if (form && form.contains(controlName)) {
            const control = this.getControl(form, controlName);
            if (control) {
                form.get(controlName)?.setValidators(validators);
                form.get(controlName)?.updateValueAndValidity();
            }
        }
    }

    /**
     * Checks whether the given control is valid.
     * @param form The instance of the {FormGroup} represent the form.
     * @param controlName The control whose validaty will be checked.
     * @returns The boolean value indicates whether control is valid.
     */
    hasRequiredError(form: FormGroup, controlName: string): boolean {
        if (form && form.contains(controlName)) {
            const control = this.getControl(form, controlName);
            const hasRequiredError = control?.errors?.hasOwnProperty('required') || false;

            return control && !control.valid && control.touched
                && hasRequiredError;
        }
        return false;
    }

    /**
     * Checks the validity of a given control.
     * @param form The instance of the {FormGroup} represent the form.
     * @param controlName The control name whose validity will be checked.
     * @returns a boolean value indicates whether the control has a pattern error.
     */
    hasPatternError(form: FormGroup, controlName: string): boolean {
        if (form && form.contains(controlName)) {
            const control = this.getControl(form, controlName);
            const hasPatternError = control?.errors?.hasOwnProperty('pattern') || false;

            return control && !control.valid && control.touched && hasPatternError;
        }
        return false;
    }

    /**
     * Checks the validity of a given control.
     * @param form The instance of the {FormGroup} represent the form.
     * @param controlName The control name whose validity will be checked.
     * @returns a boolean value indicates whether the control has a email error.
     */
    hasEmailError(form: FormGroup, controlName: string): boolean {
        if (form && form.contains(controlName)) {
            const control = this.getControl(form, controlName);
            const hasEmailError = control?.errors?.hasOwnProperty('email') || false;

            return control && !control.valid && control.touched && hasEmailError;
        }
        return false;
    }

    /**
     * Gets a form control by its name.
     * @param form The instance of the {FormGroup} represent the form.
     * @param controlName The control name whose validity will be checked.
     * @returns The instance of the {AbstractControl} represents the form control.
     */
    private getControl(form: FormGroup, controlName: string): AbstractControl {
        if (!form) {
            throw new Error('Form is undefined.');
        }
        const control = form.get(controlName);
        if (!control) {
            throw new Error(`Control of ${controlName} is null.`);
        }
        return control;
    }

    /**
     * Validates all form controls of a form.
     * @param form The instance of the {FormGroup}.
     * @returns The instance of the validated {FormGroup}.
     */
    validateFormControls(form: FormGroup): FormGroup {
        if (!form) { return new FormBuilder().group({}); }

        Object.keys(form.controls).forEach(controlName => {
            const control = form.get(controlName);
            if (control && control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control && control instanceof FormGroup) {
                this.validateFormControls(control);
            }
        });

        return form;
    }

    /**
     * Validates a form.
     * @param form The instance of the {FormGroup}.
     * @param savingInProgress The function that sets the value indicates whether the saving is in progress.
     * @returns The boolean value indicates whether form is valid.
     */
    validateForm(form: FormGroup): boolean {
        this.inProgress = true;
        form = this.validateFormControls(form);
        if (!form.valid) {
            this.inProgress = false;
            return false;
        }
        return true;
    }
}
