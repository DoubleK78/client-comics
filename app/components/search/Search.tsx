"use client"
import PagingRequest from "@/app/models/paging/PagingRequest";
import { useEffect, useState } from "react";
import ComicSearchResult from "./ComicSearchResult";
import FilterComponent from "./FilterComponent";
import { getAlbums } from "@/lib/services/client/album/albumService";

export default function Search({ locale, roleUser }: { locale: any, roleUser: any }) {
    const [albums, setAlbums] = useState();
    const [totalRecords, setTotalRecords] = useState(0);
    const [isSubmitFilter, setIsSubmitFilter] = useState(false);
    const location = (typeof window !== 'undefined') ? window.location.search : '';
    const urlParams = new URLSearchParams(location);
    const value = urlParams?.get('value');
    const [pagingParams, setPagingParams] = useState<PagingRequest>({
        PageNumber: 1,
        PageSize: 12,
        SearchTerm: value ? value : '',
        SortColumn: value ? 'title' : '',
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
        region: locale
    });

    useEffect(() => {
        //To Do

        filter.genre = filter.genre.toString().replace(/^0,/, '');

        if (filter.year.toString().charAt(0) === ',')
            filter.year =filter.year.toString().slice(1);

        console.log(filter.genre)
        getAlbums(pagingParams, filter).then((response: any) => {
            if (response && response.data) {
                setAlbums(response.data);
                setTotalRecords(response.rowNum);
            }
        });
    }, [filter.firstChar, isSubmitFilter, pagingParams]);

    return (
        <>
            <FilterComponent locale={locale} pagingParams={pagingParams} setPagingParams={setPagingParams} filter={filter} setFilter={setFilter} setIsSubmitFilter={setIsSubmitFilter} isSubmitFilter={isSubmitFilter} />
            <ComicSearchResult albums={albums} totalRecords={totalRecords} setPagingParams={setPagingParams} pagingParams={pagingParams} roleUser={roleUser}/>
        </>
    );
}