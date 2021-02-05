import { ReactiveFormService } from './reactive-form.service';
import { ReactiveFormValidationService } from './reactive-form-validation.service';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { FormField } from './form-field.model';

describe('ReactiveFormValidationService', () => {
    const formService: ReactiveFormService = new ReactiveFormService();
    const validationService: ReactiveFormValidationService = new ReactiveFormValidationService();
    let form: FormGroup = new FormGroup({
        test: new FormControl('')
    });
    const formBuilder = new FormBuilder();
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            providers: []
        });

        const formFields: FormField[] = [
            new FormField('value1', 'test1', [Validators.required, Validators.maxLength(20)]),
            new FormField('value2', 'test2', [Validators.required, Validators.maxLength(20)]),
            new FormField('value3', 'test3', [Validators.required, Validators.maxLength(20)]),
            new FormField('value4', 'test4', [Validators.required, Validators.maxLength(20)]),
            new FormField('value5', 'test5', [Validators.required, Validators.maxLength(20)]),
            new FormField('value6', 'test6', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]),
        ];

        form = formService.createForm(formBuilder, form, formFields);
    });
    it('should create an instance of the {ReactiveFormValidationService}.', () => {
        expect(validationService).toBeTruthy();
        console.log(`validationService: ${validationService}`);
    });
    it('#setControlValidators() should set the given validators to the control.', () => {
        const validators = [Validators.email, Validators.minLength(5)];
        validationService.setControlValidators(form, 'test1', validators);
        expect(form.get('test1')?.validator).toBeTruthy();
        console.log(`#setControlValidators() has validators: ${form.get('test1')?.validator}`);
    });
    it('#clearControlValidators() should clear all validators of a given control.', () => {
        validationService.clearControlValidators(form, 'test1');
        expect(form.get('test1')?.validator).toBeFalsy();
        console.log(`#clearControlValidators validator: ${form.get('test1')?.validator}`);
    });
    it('#hasPatternErrors() should detect pattern errors.', () => {
        expect(validationService.hasPatternError(form, 'test6')).toBe(true);
        console.log(`#hasPatternErrors() has errors: ${form.get('test6')?.errors}`);
    });
});
