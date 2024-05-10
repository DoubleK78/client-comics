export default interface ClientAuthenticateResponse {
    id?: string;
    fullName?: string;
    userName?: string;
    jwtToken?: string;
    roles?: Array<string> | null;
    expriedRoleDate?: Date | null;
    createdOnUtc?: Date | null;
}