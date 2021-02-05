import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiMessage, User, UserRequest } from '../bank-account.model';
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

  /**
   * The user form.
   */
  userForm: FormGroup;

  /**
   * The user collection.
   */
  users: User[] = [];

  /**
   * The value which indicates whether a user is adding a user.
   */
  isAddingUser = false;

  /**
   * Initializes a new instance of the {UserComponent}.
   * @param formService The instance of the {ReactiveFormService} provides reactive form functionality.
   * @param formValidationService The instance of the {ReactiveFormValidationService} provides validation service.
   * @param formBuilder The instance of the {FormBuilder}.
   * @param userService The instance of the {UserService} provides user service API calls.
   * @param toastr The toaster service.
   */
  constructor(private formService: ReactiveFormService,
    private formValidationService: ReactiveFormValidationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) {
    super();
    this.userForm = this.formBuilder.group({});
    this.createForm();
  }

  /**
   * Performs required operations using form initialization.
   */
  ngOnInit(): void {
    // Forward form and form service to super class.
    this.forwardDeps(this.userForm, this.formValidationService);
    this.fetchAllUsers();
  }

  /**
   * Cancles adding a user operation.
   */
  onCancelClick() {
    this.setIsAddingUser(false);
  }

  /**
   * Saves a user when a user clicks the save button.
   * @returns
   */
  onSaveClick() {
    if (!this.formValidationService.validateForm(this.userForm)) {
      return;
    }
    this.processUserRequest();
    this.resetForm();
  }

  /**
   * Shows the form when a user clicks a add-user button.
   */
  onAddUserClick() {
    this.setIsAddingUser(true);
  }

  /**
   * Delets a user when a user clicks delete-user button.
   * @param userId The user ID.
   */
  onDeleteUserClick(userId: string) {
    this.deleteUser(userId);
  }

  /**
   * Resets the user form.
   */
  private resetForm(): void {
    this.formService.resetForm(this.userForm);
  }

  /**
   * Processes the user request and fetches the response payload.
   */
  private processUserRequest(): void {
    this.userService.createUser(this.prepareUserRequest())
      .subscribe(response => {
        this.userService.handleResponse<User>(response);
        this.fetchAllUsers();
      },
        error => this.userService.handleResponeError(error));
  }

  /**
   * Fetches all users.
   */
  private fetchAllUsers(): void {
    this.userService.fetchAllUsers()
      .subscribe(response =>
        this.users = this.userService.handleResponse<User[]>(response),
        error => this.userService.handleResponeError(error));
  }

  /**
   * Deletes a user by ID.
   * @param userId The user Id.
   */
  private deleteUser(userId: string): void {
    this.userService.deleteUser(userId)
      .subscribe(response => {
        const message = this.userService.handleResponse<ApiMessage>(response);
        if (message && message.successful) {
          this.fetchAllUsers();
          this.toastr.success('The user was deleted successfully.');
        }
      },
        error => this.userService.handleResponeError(error));
  }

  /**
  * Prepares the user request.
  * @returns The instance of the {UserRequest} represents the user request.
  */
  private prepareUserRequest(): UserRequest {
    const request = new UserRequest();
    request.firstName = this.formService.getControlValue(this.userForm, 'firstName');
    request.lastName = this.formService.getControlValue(this.userForm, 'lastName');
    request.email = this.formService.getControlValue(this.userForm, 'email');
    request.phone = this.formService.getControlValue(this.userForm, 'phone');
    request.password = this.formService.getControlValue(this.userForm, 'password');
    request.username = request.email || request.phone;
    return request;
  }

  /**
   * Sets the value indicates whether adding a user is needed.
   * @param value The adding user value.
   */
  private setIsAddingUser(value: boolean) {
    this.isAddingUser = value;
  }

  /**
   * Creates the account form.
   */
  private createForm(): void {
    const formFields: FormField[] = [
      new FormField(null, 'firstName', [Validators.maxLength(50), Validators.required]),
      new FormField(null, 'lastName', [Validators.maxLength(50), Validators.required]),
      new FormField(null, 'email', [Validators.maxLength(20), Validators.email]),
      new FormField(null, 'phone', [Validators.maxLength(20)]),
      new FormField(null, 'password', [Validators.maxLength(20), Validators.required]),
    ];
    this.userForm = this.formService.createForm(this.userForm, formFields);
  }
}
