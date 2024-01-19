"use client"
import ServerResponse from "@/app/models/common/ServerResponse";
import PagingRequest from "@/app/models/paging/PagingRequest";
import { useEffect, useState } from "react";
import ComicSearchResult from "./ComicSearchResult";
import FilterComponent from "./FilterComponent";
import { portalServer } from "@/lib/services/client/baseUrl";
import axiosClientApiInstance from "@/lib/services/client/interceptor";

const getAlbums = async (params: PagingRequest, filter: any) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>(portalServer + '/api/album', {
            params: { ...params, ...filter },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};

export default function Search() {
    const [albums, setAlbums] = useState();
    const [pagingCount, setPagingCount] = useState({});
    const [isSubmitFilter, setIsSubmitFilter] = useState(false);
    const [pagingParams, setPagingParams] = useState<PagingRequest>({
        PageNumber: 1,
        PageSize: 12,
        SearchTerm: '',
        SortColumn: '',
        SortDirection: 'asc'
    });
    const [filter, setFilter] = useState({
        firstChar: '',
        genre: '',
        country: '',
        year: '',
        status: false,
        language: '',
        rating: '',
    });

    useEffect(() => {
        //To Do
        filter.genre = filter.genre.toString().replace(/^0,/, '');
        filter.year = filter.year.toString().replace(/^0,/, '');
        getAlbums(pagingParams, filter).then((response: any) => {
            if (response && response.data) {
                setAlbums(response.data);
                setPagingCount({
                    pageLength: response.rowNum,
                })
            }
        });
    }, [pagingParams, filter.firstChar, isSubmitFilter]);

    return (
        <>
            <FilterComponent pagingParams={pagingParams} setPagingParams={setPagingParams} filter={filter} setFilter={setFilter} setIsSubmitFilter={setIsSubmitFilter} isSubmitFilter={isSubmitFilter} />
            <ComicSearchResult albums={albums} pagingCount={pagingCount} setPagingParams={setPagingParams} pagingParams={pagingParams} />
        </>
    );
}