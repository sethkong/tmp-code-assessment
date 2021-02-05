import { ReactiveFormValidationService } from './reactive-form-validation.service';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * The {FormComponent} represents the base class of form component.
 */
export class FormComponent {
    /**
     * @param form The instance of the {FormGroup} represents a form.
     */
    private form: FormGroup | undefined;

    /**
     * @param formValidation The intance of the {ReactiveFormValidationService}
     * represents the reactive form validation service.
     */
    private formValidation: ReactiveFormValidationService | undefined;

     /**
     * The value indicates whether the form is being saved.
     */
    protected isSavingInProgress = false;

    /**
     * The value indicates whether the form data is being edited.
     */
    protected isEditing = false;

    /**
     * Displays form field error message by adding `is-invalid` CSS class.
     * @param field The form field/control name.
     * @return The CSS class which indicates the form field error.
     */
    displayFormFieldError(field: string): any {
        return {
            'is-invalid': this.hasFormFieldError(field)
                || this.hasFormFieldPatternError(field)
        };
    }

    /**
     * Checks the given form field whether the form field has a validation error.
     * @param field The form field/control name.
     * @return The boolean value {true} if the form field has a validation error.
     */
    hasFormFieldError(field: string): boolean {
        if (this.form && this.formValidation) {
            return this.formValidation.hasRequiredError(this.form, field);
        }
        return false;
    }

    /**
     * Checks the given form field whether it has a validation pattern error.
     * @param field The form field/control name.
     * @return The boolean value {true} if the field has a validation pattern error.
     */
    hasFormFieldPatternError(field: string): boolean {
        if (this.form && this.formValidation) {
            return this.formValidation.hasPatternError(this.form, field)
                && !this.formValidation.hasRequiredError(this.form, field);
        }
        return false;
    }

    /**
     * Checks the given form field whether it has a validation pattern error.
     * @param field The form field/control name.
     * @return The boolean value {true} if the field has a validation pattern error.
     */
    hasFormFieldEmailError(field: string): boolean {
        if (this.form && this.formValidation) {
            return this.formValidation.hasEmailError(this.form, field)
                && !this.formValidation.hasRequiredError(this.form, field);
        }
        return false;
    }

    /**
     * @param form The instance of the {FormGroup} represents a form.
     * @param formValidation The intance of the {ReactiveFormValidationService}
     */
    protected forwardDeps(form: FormGroup, formValidation: ReactiveFormValidationService): void {
        this.form = form;
        this.formValidation = formValidation;
    }

     /**
     * Sets the editing mode value.
     * @param value The value indicates whether it is in edit mode.
     */
    protected setIsEditing(value: boolean) {
        this.isEditing = value;
    }

    /**
     * Sets the saving mode value.
     * @param value The value indicates whether it is in saving mode.
     */
    protected setIsSavingInProgress(value: boolean) {
        this.isSavingInProgress = value;
    }
}
