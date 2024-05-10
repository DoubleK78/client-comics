import ServerResponse from "@/app/models/common/ServerResponse";
import axiosClientApiInstance from "../interceptor";
import ActivityLogRequestModel from "@/app/models/activity/ActivityLogRequestModel";

export const createActivityLog = async (requestModel: ActivityLogRequestModel) => {
    try {
        const response = await axiosClientApiInstance.post<ServerResponse<any>>('/api/user/activity-log', requestModel);
        return response.data.data;
    } catch (error) {
        return null;
    }
};
