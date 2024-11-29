import ServerResponse from "@/app/models/common/ServerResponse";
import axiosClientApiInstance from "../interceptor";
import axios, { AxiosError } from "axios";

export const pushComment = async (commentData: any) => {
    try {
        const response = await axiosClientApiInstance.post<ServerResponse<any>>('/api/comment', commentData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerResponse<any>>;
            if (serverError && serverError.response && serverError.response.data?.errorMessage?.includes('level')) {
                return 'level';
            }
        }

        return null;
    }
};

export const getComments = async (queryParams: any) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/comment', {
            params: queryParams,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};
