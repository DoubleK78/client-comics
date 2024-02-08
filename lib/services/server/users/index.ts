import { portalServer } from "../../client/baseUrl";
import ServerResponse from "@/app/models/common/ServerResponse";
import UserProfileResponse from "@/app/models/profile/UserProfileResponse";
import getAxiosInstance from "@/lib/axios";

export const getProfile = async (token?: string | null) => {
    try {
        const response = await getAxiosInstance(process.env.PORTAL_API_URL, token).get<ServerResponse<UserProfileResponse>>(portalServer + '/api/user');
        return response.data.data;
    } catch (error) {
        return null;
    }
};