import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { Output, EventEmitter, Injectable } from '@angular/core';
import { IApiResponse } from './api-response';
import { ErrorMessage } from '../errors/error-message.model';

@Injectable()
export abstract class HttpService {
  /**
   * The API endpoint.
   */
  apiUrl: string;

  /**
   * The authorization access token.
   */
  token: string;

  /**
   * The value indicates whether the HTTP call is in progress.
   */
  inProgress = false;

  /**
   * The error event emitter.
   */
  @Output() hasErrors = new EventEmitter<ErrorMessage>();

  constructor() {
    this.token = window.localStorage.getItem('token') || environment.token;
    this.apiUrl = window.localStorage.getItem('apiUrl') || environment.apiUrl;
  }

  /**
   * Gets common HTTP header properties.
   * @returns The instance of the {HttpHeaders} represents the HTTP headers.
   */
  protected getCommonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({})
      .append('Content-Type', 'application/json')
      .append('Authorization', this.token)
      .append('Access-Control-Allow-Origin', '*')
      .append('Accept', 'application/json');
  }

  /**
   * Gets common HTTP header properties.
   * @returns The instance of the {HttpHeaders} without token.
   */
  protected getNoTokenCommonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({})
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
      .append('Accept', 'application/json');
  }

  /**
   * Gets restful resource path.
   * @param resource The resource URI.
   * @returns The restful resource path.
   */
  protected getEndpoint(resource: string): string {
    return `${this.apiUrl.trim()}/${resource.trim()}`;
  }

  /**
   * Handle HTTP call errors.
   */
  protected handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code: ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened. Please try again later.');
  }

  /**
   * Handles signin response by doing error inspection and notifying the user.
   * @param response The instance of the {SigninResponse} represents the signin response.
   * @returns The instance of the {IHttpResponsePayload} represents the response payload.
   */
  handleResponse<T>(response: IApiResponse<T>): T {
    this.inProgress = false;

    if (response.error && response.error.message.length !== 0) {
      this.hasErrors.emit(new ErrorMessage(
        response.error.message,
        response.error.code,
        response.error.status
      ));
      window.scrollTo(0, 0);
    }

    if (response.hasOwnProperty('error')) {
      this.inProgress = false;
      this.hasErrors.emit(new ErrorMessage(response.error?.toString()));
      window.scrollTo(0, 0);
    }

    // Everything went well, notify the user of the success.
    return response.data ? <T>response.data : <T>response;
  }

  /**
   * Handles the HTTP response error.
   * @param error The HTTP error.
   */
  handleResponeError(error: any): void {
    console.error(`HTTP response error: ${JSON.stringify(error)}`);
    this.inProgress = false;
    this.hasErrors.emit(new ErrorMessage(JSON.stringify(error)));
    window.scrollTo(0, 0);
  }
}
