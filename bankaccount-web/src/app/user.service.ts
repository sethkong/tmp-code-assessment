import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './commons/api/http-service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IApiResponse } from './commons/api/api-response';
import { ApiMessage, User, UserRequest } from './bank-account.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  /**
   * The user endpoint.
   */
  userEndpoint = '';

  /**
    * Initializes a new instance of the {UserService}.
    * @param http The instance of the {HttpClient} service.
    */
  constructor(private http: HttpClient) {
    super();
    this.userEndpoint = this.getEndpoint('users');
  }

  /**
   * Fetches all {User} from API.
   * @returns The collections of the {User} from the service.
   */
  fetchAllUsers(): Observable<IApiResponse<User[]>> {
    return this.http.get<IApiResponse<User[]>>(this.userEndpoint,
      { headers: this.getNoTokenCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches a user by ID.
   * @param userId The user ID.
   * @returns The instance of the {User}.
   */
  fetchUserById(userId: string): Observable<IApiResponse<User>> {
    const userEndpointById = `${this.userEndpoint}/${userId}`;
    return this.http.get<IApiResponse<User[]>>(userEndpointById,
      { headers: this.getNoTokenCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Creates an user.
   * @param request The user request information.
   * @returns The newly created user.
   */
  createUser(request: UserRequest): Observable<IApiResponse<User>> {
    return this.http.post<IApiResponse<User>>(this.userEndpoint,
      request, { headers: this.getNoTokenCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a user by ID.
   * @param userId The user ID.
   * @returns The instance of the {ApiMessage}.
   */
  deleteUser(userId: string): Observable<IApiResponse<ApiMessage>> {
    const userEndpointById = `${this.userEndpoint}/${userId}`;
    return this.http.delete<IApiResponse<ApiMessage>>(userEndpointById,
      { headers: this.getNoTokenCommonHttpHeaders() })
      .pipe(catchError(this.handleError));
  }
}
