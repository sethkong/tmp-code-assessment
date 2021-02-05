export interface Account extends BaseEntity {
    accountNumber: string;
    routingNumber: string;
    balance: number;
    userId: string;
}

export class AccountRequest {
    userId: string = '';
    amount: number = 0;
    accountId: string = '';
}

export interface BaseEntity {
    id: string;
    insertedAt: Date; 
    updatedAt: Date;
    isActive: boolean;
    insertedBy: string;
    updatedBy: string;
}

export interface User extends BaseEntity {
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
}

export class UserRequest {
    firstName: string = '';
    lastName: string = '';
    password: string = '';
    email: string = '';
    phone: string = '';
}

export interface ApiMessage {
    successful: boolean;
}