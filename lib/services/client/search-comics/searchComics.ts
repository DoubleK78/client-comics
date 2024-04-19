import { ERegion } from "@/app/models/comics/ComicSitemap";
import axiosClientApiInstance from "../interceptor";
import SearchComicFilter from "@/app/models/common/SearchComicFilter";
import ServerResponse from "@/app/models/common/ServerResponse";

export const getSearchComics = async (region: ERegion) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<Array<SearchComicFilter> | null>>('/api/client/comicapp/comics-search', {
            params: { region },
        });
        return response.data;
    } catch (error) {
        return null;
    }
};