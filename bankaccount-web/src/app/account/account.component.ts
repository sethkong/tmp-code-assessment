import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../bank-account.service';
import { FormComponent } from '../commons/forms/form-component';
import { FormField } from '../commons/forms/form-field.model';
import { ReactiveFormValidationService } from '../commons/forms/reactive-form-validation.service';
import { ReactiveFormService } from '../commons/forms/reactive-form.service';
import { Account, AccountAction, AccountRequest, ApiMessage } from '../bank-account.model';
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
   * The value which indicates whether the form can be shown.
   */
  showingForm = false;

  /**
   * The current account action.
   */
  currentAction: AccountAction = AccountAction.AddAccount;

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
    this.resetForm();
    this.setShowForm(true);
    this.currentAction = AccountAction.AddAccount;
    this.formValidationService.clearControlValidators(this.accountForm, 'accountId');
  }

  /**
   * Cancles adding a account operation.
   */
  onCancelClick() {
    this.setShowForm(false);
  }

  /**
   * Saves an account when a user clicks the save button.
   * @returns
   */
  onSaveClick() {

    if (!this.formValidationService.validateForm(this.accountForm)) {
      return;
    }

    switch (this.currentAction) {
      case AccountAction.AddAccount:
        this.createAccount();
        break;
      case AccountAction.Deposit:
        this.deposit();
        break;
      case AccountAction.Widthdraw:
        this.withdraw();
        break;
    }

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
   * Deposits money into the given account.
   * @param accountId The bank account ID.
   */
  onDepositClick(accountId: string) {
    this.currentAction = AccountAction.Deposit;
    this.formValidationService.setControlValidators(this.accountForm, 'accountId', [Validators.required]);
    const account = this.accounts.find(x => x.id === accountId);
    if (account && account.userId)
      this.formService.setControlValue(this.accountForm, 'userId', account.userId);
    this.formService.setControlValue(this.accountForm, 'accountId', accountId);
    this.setShowForm(true);
  }

  /**
   * Widthdraws money from a bank account.
   * @param accountId The bank account ID.
   */
  onWidthdrawClick(accountId: string) {
    this.currentAction = AccountAction.Widthdraw;
    this.formValidationService.setControlValidators(this.accountForm, 'accountId', [Validators.required]);
    this.formService.setControlValue(this.accountForm, 'accountId', accountId);
    const account = this.accounts.find(x => x.id === accountId);
    if (account && account.userId)
      this.formService.setControlValue(this.accountForm, 'userId', account.userId);
    this.setShowForm(true);
  }

  /**
   * Creates the account and fetches the response payload.
   */
  private withdraw(): void {
    this.accountService.withdraw(this.prepareAccountRequest())
      .subscribe(response => {
        var message = this.accountService.handleResponse<ApiMessage>(response);
        if (message && message.successful) {
          this.fetchAllAccounts();
          this.toastr.success(message.message);
        } else if (message && message.successful === false) {
          this.toastr.error(message.message);
        }
      },
        error => this.accountService.handleResponeError(error));
  }

  /**
   * Creates the account and fetches the response payload.
   */
  private deposit(): void {
    this.accountService.deposit(this.prepareAccountRequest())
      .subscribe(response => {
        var message = this.accountService.handleResponse<ApiMessage>(response);
        if (message && message.successful === false) {
          this.toastr.error(message.message);
        } else if (message && message.successful) {
          this.fetchAllAccounts();
          this.toastr.success(message.message);
        }
      },
        error => this.accountService.handleResponeError(error));
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
   * Creates the account and fetches the response payload.
   */
  private createAccount(): void {
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
    if (this.currentAction === AccountAction.Deposit || this.currentAction === AccountAction.Widthdraw)
      request.accountId = this.formService.getControlValue(this.accountForm, 'accountId');
    return request;
  }

  /**
   * Sets the value indicates whether the form can be shown.
   * @param value The adding account value.
   */
  private setShowForm(value: boolean) {
    this.showingForm = value;
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
      new FormField(null, 'accountId', [])
    ];
    this.accountForm = this.formService.createForm(this.accountForm, formFields);
  }
}
