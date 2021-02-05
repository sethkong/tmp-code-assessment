import { ReactiveFormService } from './reactive-form.service';
import { FormBuilder, Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from './form-field.model';
import { TestBed } from '@angular/core/testing';

describe('ReactiveFormService', () => {
    const formBuilder: FormBuilder = new FormBuilder();
    const formService: ReactiveFormService = new ReactiveFormService();
    const formFields: FormField[] = [
        new FormField('value1', 'test1', [Validators.required, Validators.maxLength(20)]),
        new FormField('value2', 'test2', [Validators.required, Validators.maxLength(20)]),
        new FormField('value3', 'test3', [Validators.required, Validators.maxLength(20)]),
        new FormField('value4', 'test4', [Validators.required, Validators.maxLength(20)]),
    ];
    let form: FormGroup = new FormGroup({
        test: new FormControl('')
    });
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [],
           imports: [
               FormsModule,
               ReactiveFormsModule
           ],
           providers: []
       });
    });

    it('should create an instance of the {ReactiveFormService}.', () => {
        expect(formService).toBeTruthy();
        console.log(`formService: ${formService}`);
    });
    it('#createForm() should create an instance of the {FormGroup}.', () => {
        form = formService.createForm(formBuilder, form, formFields);
        expect(form).toBeTruthy();
        console.log(`#createForm() returns form: ${form}`);
    });
    it('#createControl() should create instance of the {AbstractControl}.', () => {
        const control = formService.createControl('value5', [Validators.required, Validators.maxLength(20)]);
        expect(control).toBeTruthy();
        expect(control.value).toEqual('value5');
        console.log(`#createControl() returns control: ${control}`);
    });
    it('#getControlValue() should retrieve the value from a control.', () => {
        const value1 = formService.getControlValue('test1');
        const value2 = formService.getControlValue('test2');
        expect(value1).toEqual('value1');
        expect(value2).toEqual('value2');
        console.log(`#getControlValue() returns value1: ${value1}`);
        console.log(`#getControlValue() returns value2: ${value2}`);
    });
    it('#addControl() should add an instance of the {FormControl} to the form.', () => {
        const control = formService.createControl('value6', [Validators.required, Validators.maxLength(20)]);
        formService.addControl('test6', control);
        const value = formService.getControlValue('test6');
        expect(value).toEqual('value6');
        console.log(`#addControl() and get back value: ${value}`);
    });
    it('#registerControl() should register a new control.', () => {
        formService.registerControl('value7', 'test7', [Validators.required, Validators.maxLength(20)]);
        const value = formService.getControlValue('test7');
        expect(value).toEqual('value7');
        console.log(`#registerControl() and get back value: ${value}`);
    });
    it('#setControlValue() should set a value to the given control.', () => {
        const value = 'updated value1';
        formService.setControlValue('test1', value);
        const newValue = formService.getControlValue('test1');
        expect(value).toEqual(newValue);
        console.log(`#setControlValue() and get back new value: ${newValue}`);
    });
});
