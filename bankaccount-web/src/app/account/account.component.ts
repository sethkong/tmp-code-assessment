import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../bank-account.service';
import { FormComponent } from '../commons/forms/form-component';
import { FormField } from '../commons/forms/form-field.model';
import { ReactiveFormValidationService } from '../commons/forms/reactive-form-validation.service';
import { ReactiveFormService } from '../commons/forms/reactive-form.service';
import { Account, AccountRequest, ApiMessage } from '../bank-account.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends FormComponent implements OnInit {

  /**
   * The account form.
   */
  accountForm: FormGroup;

  /**
  * The account collection.
  */
  accounts: Account[] = [];

  /**
   * The value which indicates whether a user is adding an account.
   */
  isAddingAccount = false;

  /**
   * Initializes a new instance of the {AccountComponent}.
   * @param formService The instance of the {ReactiveFormService} provides reactive form functionality.
   * @param formValidationService The instance of the {ReactiveFormValidationService} provides validation service.
   * @param formBuilder The instance of the {FormBuilder}.
   * @param accountService The instance of the {AccountService} provides account service API calls.
   * @param toastr The toaster service.
   */
  constructor(private formService: ReactiveFormService,
    private formValidationService: ReactiveFormValidationService,
    private formBuilder: FormBuilder,
    private accountService: BankAccountService,
    private toastr: ToastrService) {
    super();
    this.accountForm = this.formBuilder.group({});
    this.createForm();
  }

  /**
   * Performs required operations using form initialization.
   */
  ngOnInit(): void {
    // Forward form and form service to super class.
    this.forwardDeps(this.accountForm, this.formValidationService);
    this.fetchAllAccounts();
  }

  /**
   * Shows the adding an account form.
   */
  onAddAccountClick() {
    this.setIsAddingAccount(true);
  }

  /**
   * Cancles adding a account operation.
   */
  onCancelClick() {
    this.setIsAddingAccount(false);
  }

  /**
   * Saves an account when a user clicks the save button.
   * @returns
   */
  onSaveClick() {
    if (!this.formValidationService.validateForm(this.accountForm)) {
      return;
    }
    this.processAccountRequest();
    this.resetForm();
  }

  /**
   * Deletes a bank account.
   * @param accountId The account ID.
   */
  onDeleteAccountClick(accountId: string) {
    this.deleteAccount(accountId);
  }

  /**
   * Deletes an account by ID.
   * @param accountId The account ID.
   */
  private deleteAccount(accountId: string): void {
    this.accountService.deleteAccount(accountId)
      .subscribe(response => {
        const message = this.accountService.handleResponse<ApiMessage>(response);
        if (message && message.successful) {
          this.fetchAllAccounts();
          this.toastr.success('The account was deleted successfully.');
        }
      },
        error => this.accountService.handleResponeError(error));
  }

  /**
   * Processes the account request and fetches the response payload.
   */
  private processAccountRequest(): void {
    this.accountService.createAccount(this.prepareAccountRequest())
      .subscribe(response => {
        this.accountService.handleResponse<Account>(response);
        this.fetchAllAccounts();
      },
        error => this.accountService.handleResponeError(error));
  }

  /**
   * Fetches all accounts.
   */
  private fetchAllAccounts(): void {
    this.accountService.fetchAllAccounts()
      .subscribe(response =>
        this.accounts = this.accountService.handleResponse<Account[]>(response),
        error => this.accountService.handleResponeError(error));
  }

  /**
   * Prepares the account request.
   * @returns The instance of the {AccountRequest} represents the account request.
   */
  private prepareAccountRequest(): AccountRequest {
    const request = new AccountRequest();
    request.userId = this.formService.getControlValue(this.accountForm, 'userId');
    request.amount = parseFloat(this.formService.getControlValue(this.accountForm, 'amount'));
    return request;
  }

  /**
   * Sets the value indicates whether adding an account is needed.
   * @param value The adding account value.
   */
  private setIsAddingAccount(value: boolean) {
    this.isAddingAccount = value;
  }

  /**
  * Resets the account form.
  */
  private resetForm(): void {
    this.formService.resetForm(this.accountForm);
  }

  /**
  * Creates the account form.
  */
  private createForm(): void {
    const formFields: FormField[] = [
      new FormField(null, 'userId', [Validators.maxLength(36), Validators.required]),
      new FormField(null, 'amount', [Validators.required, Validators.min(1)]),
    ];
    this.accountForm = this.formService.createForm(this.accountForm, formFields);
  }
}
