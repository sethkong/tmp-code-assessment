export interface Account {
    accountNumber: string;
    routingNumber: string;
    balance: number;
    userId: string;
    id: string;
    insertedAt: Date; 
    updatedAt: Date;
    isActive: boolean;
    insertedBy: string;
    updatedBy: string;
}

export class AccountRequest {
    userId: string = '';
    amount: number = 0;
    accountId: string = '';
}

export interface User {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordHash: string;
    isLocked: boolean;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    email: string;
    phone: string;
    id: string;
    insertedAt: Date; 
    updatedAt: Date;
    isActive: boolean;
    insertedBy: string;
    updatedBy: string;
}

export class UserRequest {
    firstName: string = '';
    lastName: string = '';
    password: string = '';
    email: string = '';
    phone: string = '';
    username: string = '';
}

export interface ApiMessage {
    successful: boolean;
    message: string;
}

export enum AccountAction {
    AddAccount, 
    Widthdraw, 
    Deposit
}