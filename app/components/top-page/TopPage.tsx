"use client"
import ComicSearchResult from "@/app/components/search/ComicSearchResult";
import ServerResponse from "@/app/models/common/ServerResponse";
import PagingRequest from "@/app/models/paging/PagingRequest";
import { portalServer } from "@/lib/services/client/baseUrl";
import axiosClientApiInstance from "@/lib/services/client/interceptor";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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

export default function TopPage({ locale }: { locale: any }) {
    const typePage = typeof window !== 'undefined' ? new URLSearchParams(window.location.search)?.get('typePage') || "" : "";
    const typeSort = typeof window !== 'undefined' ? new URLSearchParams(window.location.search)?.get('sort') || "" : "";
    const t = useTranslations('search');
    const [albums, setAlbums] = useState<any>();
    const [pagingCount, setPagingCount] = useState({});
    const types = ['manhwa', 'manga', 'manhua', 'comic', 'bande_dessinée'];
    let sortColumn = 'views';

    if (typeSort !== "" && typePage === "") {
        sortColumn = 'updatedOnUtc';
    } else if (typePage !== "" && typeSort === "") {
        sortColumn = 'viewByTopType';
    }

    const initialParams = {
        PageNumber: 1,
        PageSize: 12,
        SearchTerm: '',
        SortColumn: sortColumn,
        SortDirection: 'desc'
    };

    const typesParams = {
        PageNumber: 1,
        PageSize: 12,
        SearchTerm: typePage,
        SortColumn: 'title',
        SortDirection: 'asc',
    };

    const [pagingParams, setPagingParams] = useState<PagingRequest>(
        typePage !== null && types.includes(typePage) ? typesParams : initialParams
    );

    const createFilters = (type: any): any => ({
        firstChar: '',
        genre: '',
        country: '',
        year: '',
        status: false,
        language: '',
        rating: '',
        topType: types.includes(typePage) ? '': type,
        region: locale
    });

    const fetchData = async (filters: any, setAlbums: (data: any) => void) => {
        const response = await getAlbums(pagingParams, filters);
        if (response && response.data) {
            setPagingCount({
                pageLength: response.rowNum,
            })
            setAlbums(response.data);
        }
    };

    useEffect(() => {
        const fetchDataAndSetAlbums = async () => {
            const filters = createFilters(typePage);
            await fetchData(filters, setAlbums);
        };

        fetchDataAndSetAlbums();
    }, []);

    return (
        <>
            {/* <!--=====================================-->
            <!--=      Breadcrumb Area Start        =-->
            <!--=====================================--> */}
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li>
                                {(() => {
                                    if (typePage === 'day') {
                                        return (
                                            <a className="active">{t('top_day')}</a>
                                        )
                                    }
                                    if (typePage === 'month') {
                                        return (
                                            <a className="active">{t('top_month')}</a>
                                        )
                                    } else if (typePage === 'year') {
                                        return (
                                            <a className="active">{t('top_year')}</a>
                                        )
                                    }
                                    else if (typePage === '') {
                                        return (
                                            <a className="active">{t('top_all')}</a>
                                        )
                                    }
                                    else if (typePage === 'manga') {
                                        return (
                                            <a className="active">{t('manga')}</a>
                                        )
                                    }
                                    else if (typePage === 'manhwa') {
                                        return (
                                            <a className="active">{t('manhwa')}</a>
                                        )
                                    }
                                    else if (typePage === 'manhua') {
                                        return (
                                            <a className="active">{t('manhua')}</a>
                                        )
                                    }
                                    else if (typePage === 'comic') {
                                        return (
                                            <a className="active">{t('comic')}</a>
                                        )
                                    }
                                    else if (typePage === 'bande_dessinée') {
                                        return (
                                            <a className="active">{t('bande_dessinée')}</a>
                                        )
                                    }
                                    else {
                                        return (
                                            <a className="active">{t('top_day')}</a>
                                        )
                                    }
                                })()}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <ComicSearchResult albums={albums} pagingCount={pagingCount} setPagingParams={setPagingParams} pagingParams={pagingParams} />
        </>
    );
}