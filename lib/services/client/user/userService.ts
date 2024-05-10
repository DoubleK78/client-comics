import ServerResponse from "@/app/models/common/ServerResponse";
import axiosClientApiInstance from "../interceptor";
import { ERegion } from "@/app/models/comics/ComicSitemap";
import PagingRequest from "@/app/models/paging/PagingRequest";

export const getTopRankUsers = async (params: PagingRequest, region: ERegion) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/user/ranking', {
            params: { ...params, region },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};
