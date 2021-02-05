/**
 * The {FormField} represents the form field.
 */
export class FormField {
    defaultValue: any;
    controlName?: string;
    validators?: any[] = [];
    options?: any[] = [];

    constructor(defaultValue?: any,
                controlName?: string,
                validators?: any[],
                options?: any[]
    ) {
        this.defaultValue = defaultValue;
        this.controlName = controlName;
        this.validators = validators;
        this.options = options;
    }
}
