import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../commons/forms/form-component';
import { FormField } from '../commons/forms/form-field.model';
import { ReactiveFormValidationService } from '../commons/forms/reactive-form-validation.service';
import { ReactiveFormService } from '../commons/forms/reactive-form.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends FormComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formService: ReactiveFormService,
              private formValidationService: ReactiveFormValidationService,
              private formBuilder: FormBuilder,
              private userService: UserService) { 
      super();
      this.userForm = this.formBuilder.group({});
      this.createForm();
    }

  ngOnInit(): void {
     // Forward form and form service to super class.
     this.forwardDeps(this.userForm, this.formValidationService);
  }

  /**
   * Creates the account form.
   */
  private createForm(): void {
    const formFields: FormField[] = [
      new FormField(null, 'firstName', [Validators.maxLength(50), Validators.required]),
      new FormField(null, 'lastName', [Validators.maxLength(50), Validators.required]),
      new FormField(null, 'email', [Validators.maxLength(20),
      Validators.required, Validators.email])
    ];
    this.userForm = this.formService.createForm(this.formBuilder, this.userForm, formFields);
  }

}
