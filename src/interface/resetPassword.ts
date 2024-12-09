export interface Reset {
    loginId: string;
    newPassword: string;
    confirmPassword?: string;
}

export interface Validate {
    loginId: string;
    email: string;
}