import { Session } from "next-auth";

export default interface ClientTokenSessionServer {
    authenticated: boolean,
    session: Session
}