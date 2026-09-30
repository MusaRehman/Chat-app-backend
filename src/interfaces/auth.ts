

interface RegisterAuthRequest {
    username: string;
    email: string;
    password: string;
    role?: "user" | "admin";
}

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
}

export { RegisterAuthRequest, UserAttributes };