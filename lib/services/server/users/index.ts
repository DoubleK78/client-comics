import ServerResponse from "@/app/models/common/ServerResponse";
import UserProfileResponse from "@/app/models/profile/UserProfileResponse";
import { getAxiosInstanceAsync } from "@/lib/axios";

export const getProfile = async () => {
    try {
        const response = await (await getAxiosInstanceAsync()).get<ServerResponse<UserProfileResponse>>('/api/user');
        return response.data.data;
    } catch (error) {
        return null;
    }
};