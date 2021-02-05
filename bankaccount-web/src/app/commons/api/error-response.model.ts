/**
 * The {IErrorResponse} represents the response error.
 */
export interface IErrorResponse {
    /**
     * The error code.
     */
    code: string;
    /**
     * The error message.
     */
    message: string;
    /**
     * The error status: Fatal, Critical, Normal.
     */
    status: string;
}
