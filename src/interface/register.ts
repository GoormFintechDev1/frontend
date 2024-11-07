
export interface InputType {
    account: string;
    password: string;
}

export interface IdentityNumber {
    front: string;
    back: string;
}

export interface InputType2 {
    name: string;
    phoneNumber: string;
    identityNumber: IdentityNumber;
    address: string;
    email: string;
}

export interface FormDataType {
    account: string;
    password: string;
    name: string;
    phoneNumber: string;
    identityNumber: string;
    address: string;
    email: string;
}