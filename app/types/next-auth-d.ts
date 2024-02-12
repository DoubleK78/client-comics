import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    googleToken?: string;
    /** Our Server Token */
    apiToken?: string;
    /** Our Server Roles */
    roles?: Array<string> | null;
  }
}

declare module "next-auth" {
  /**
 * Leveraged by session callback's user object (AdapterUser extends User)
 */
  export interface User extends DefaultUser {
    /** Define any user-specific variables here to make them available to other code inferences */
    apiToken?: string;
    roles?: Array<string> | null;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Oauth access token */
      token?: JWT;
    } & DefaultSession["user"];
  }
}