import axiosClientApiInstance from "@/lib/services/client/interceptor";
import ServerResponse from "../../../../app/models/common/ServerResponse";

export const sendEmail = async (requestModel: SendEmailMessage) => {
    try {
        const response = await axiosClientApiInstance.post<ServerResponse<any>>('/api/email', requestModel);
        return response.data;
    } catch (error) {
        return null;
    }
};