import { IErrorMessage } from 'src/app/commons/errors/error-message.model';


/**
 * The {ApiResponse} represents the HTTP response.
 */
export interface ApiResponse<T> {
    /**
     * The {IErrorMessage} represents the error message.
     */
    error?: IErrorMessage;
    /**
     * The response data.
     */
    data?: T;
}
