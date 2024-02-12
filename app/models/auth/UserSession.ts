export default interface UserSession {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles?: Array<string> | null;
}