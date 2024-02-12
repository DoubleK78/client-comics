export default interface ClientAuthenticateResponse {
    id?: string;
    fullName?: string;
    userName?: string;
    jwtToken?: string;
    roles?: Array<string> | null;
}