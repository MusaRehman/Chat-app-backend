

interface RegisterAuthRequest {
    username: string;
    email: string;
    password: string;
}

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
}

export { RegisterAuthRequest, UserAttributes };