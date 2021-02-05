export class ErrorMessage {
    message?: string;
    code?: string;
    status?: string;

    constructor(message?: string, code?: string, status?: string) {
        this.message = message;
        this.code = code;
        this.status = status;
    }
}

export interface IErrorMessage {
    message: string;
    code: string;
    status: string;
}
