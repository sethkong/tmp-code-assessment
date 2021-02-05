export class ValidationPatterns {
    static readonly ALPHA_NUMERIC_SPACE = /^[-\w\s]+$/;
    static readonly ALPHA_NUMERIC_SPACE_COMMA = /^[,-\w\s]+$/;
    static readonly US_ZIPCODE = /^\d{5}(?:[-\s]\d{4})?$/;
}
