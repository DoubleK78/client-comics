import ClientTokenSessionServer from "@/app/models/auth/ClientTokenSessionServer";
import UserSession from "@/app/models/auth/UserSession";
import axios from "axios";
import { identityServer } from "../baseUrl";

export const getTokenFromSessionServer = async () => {
    const response = await axios.get<ClientTokenSessionServer>('/api/session');
    if (response.status == 200 && response.data?.session) {
        const apiToken = response.data.session?.user.token?.apiToken ?? '';
        const userSession: UserSession = {
            name: response.data.session?.user.name,
            email: response.data.session?.user.email,
            image: response.data.session?.user.image,
            roles: response.data.session?.user.token?.roles,
            expriedRoleDate: response.data.session?.user.token?.expriedRoleDate,
            createdOnUtc: response.data.session?.user.token?.createdOnUtc
        }

        localStorage.setItem('token', apiToken);
        localStorage.setItem('userSession', JSON.stringify(userSession));
        return apiToken;
    }
}

export const checkRoleUpdate = async () => {
    try {
        const response = await axios.get<{ isBanned?: boolean; roleType?: number }>('/api/user/type-sub', {
            baseURL: identityServer,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}