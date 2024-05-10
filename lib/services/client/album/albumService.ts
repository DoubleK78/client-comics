import ServerResponse from "@/app/models/common/ServerResponse";
import PagingRequest from "@/app/models/paging/PagingRequest";
import axiosClientApiInstance from "../interceptor";
import { AlbumScheduleRequestModel } from "@/app/models/album/AlbumScheduleRequestModel";

export const getAlbums = async (params: PagingRequest, filter: any) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/client/comicapp/paging', {
            params: { ...params, ...filter },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};

export const getScheduleAlbums = async (params: AlbumScheduleRequestModel) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/album/schedule', {
            params: params,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};