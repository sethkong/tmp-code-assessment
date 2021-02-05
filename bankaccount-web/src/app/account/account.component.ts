import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../bank-account.service';
import { FormComponent } from '../commons/forms/form-component';
import { FormField } from '../commons/forms/form-field.model';
import { ReactiveFormValidationService } from '../commons/forms/reactive-form-validation.service';
import { ReactiveFormService } from '../commons/forms/reactive-form.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends FormComponent implements OnInit {

  accountForm: FormGroup;

  constructor(private formService: ReactiveFormService,
              private formValidationService: ReactiveFormValidationService,
              private formBuilder: FormBuilder,
              private accountService: BankAccountService) { 
    super();
    this.accountForm = this.formBuilder.group({});
    this.createForm();
  }

  ngOnInit(): void {
     // Forward form and form service to super class.
     this.forwardDeps(this.accountForm, this.formValidationService);
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
    this.accountForm = this.formService.createForm(this.formBuilder, this.accountForm, formFields);
  }
}
