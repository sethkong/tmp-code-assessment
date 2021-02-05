import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from './commons/api/api-response';
import { HttpService } from './commons/api/http-service';
import { catchError } from 'rxjs/operators';
import { Account, AccountRequest, ApiMessage } from './bank-account.model';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService extends HttpService {

  /**
   * The account endpoint.
   */
  accountEndpoint = '';

  /**
   * The widthdraw endponit.
   */
  widthdrawEndtpoint = '';

  /**
   * The deposit endpoint.
   */
  depositEndpoint = '';

  /**
   * Initializes a new instance of the {AccountService}.
   * @param http The instance of the {HttpClient} service.
   */
  constructor(private http: HttpClient) {
    super();
    this.accountEndpoint = this.getEndpoint('accounts');
    this.widthdrawEndtpoint = this.getEndpoint('accounts/widthdraw');
    this.depositEndpoint = this.getEndpoint('accounts/deposit');
  }

  /**
    * Fetches all {Account} from service.
    * @returns The collections of the {Account} from the service.
    */
  fetchAllAccounts(): Observable<IApiResponse<Account[]>> {
    return this.http.get<IApiResponse<Account[]>>(this.accountEndpoint,
      { headers: this.getNoTokenCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches an account by ID.
   * @param accountId The account ID.
   * @returns The instance of the {Account}.
   */
  fetchAccountById(accountId: string): Observable<IApiResponse<Account>> {
    const accountEndpointById = `${this.accountEndpoint}/${accountId}`;
    return this.http.get<IApiResponse<Account[]>>(accountEndpointById,
      { headers: this.getNoTokenCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Creates an account.
   * @param request The account request information.
   * @returns The newly created account.
   */
  createAccount(request: AccountRequest): Observable<IApiResponse<Account>> {
    return this.http.post<IApiResponse<Account>>(this.accountEndpoint,
      request, { headers: this.getCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a bank account by ID.
   * @param accountId The bank account ID.
   * @returns The instance of the {ApiMessage}.
   */
  deleteAccount(accountId: string): Observable<IApiResponse<ApiMessage>> {
    const accountEndpointById = `${this.accountEndpoint}/${accountId}`;
    return this.http.delete<IApiResponse<ApiMessage>>(accountEndpointById,
      { headers: this.getCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deposits money into a bank account.
   * @param payload The bank account request payload.
   * @returns The response message.
   */
  deposit(payload: AccountRequest): Observable<IApiResponse<ApiMessage>> {
    return this.http.post<IApiResponse<ApiMessage>>(this.depositEndpoint,
      payload, { headers: this.getCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Widthdraws money from a bank account.
   * @param payload The bank account request payload.
   * @returns The response message.
   */
  withdraw(payload: AccountRequest): Observable<IApiResponse<ApiMessage>> {
    return this.http.post<IApiResponse<ApiMessage>>(this.widthdrawEndtpoint,
      payload, { headers: this.getCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }
}
