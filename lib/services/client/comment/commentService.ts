import ServerResponse from "@/app/models/common/ServerResponse";
import axiosClientApiInstance from "../interceptor";
import { portalServer } from "../baseUrl";

export const pushComment = async (commentData: any) => {
    try {
        const response = await axiosClientApiInstance.post<ServerResponse<any>>(portalServer + '/api/comment', commentData);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getComments = async (queryParams: any) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>(portalServer + '/api/comment', {
            params: queryParams,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};
