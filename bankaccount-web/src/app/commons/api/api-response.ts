import { IErrorMessage } from '../errors/error-message.model';

/**
 * The {IHttpResponse} represents the HTTP response.
 */
export interface IApiResponse<T> {
    /**
     * The {IErrorMessage} represents the error message.
     */
    error?: IErrorMessage;

    /**
     * The response data.
     */
    data?: T;
}

export class ApiResponse<T> {
    /**
     * The http payload.
     */
    payload?: T;

    /**
     * Initializes a new instance of the {HttpResponse}.
     * @param payload The HTTP response payload.
     */
    constructor(payload?: T) {
        this.payload = payload;
    }
}
