"use client"
import { useTranslations } from 'next-intl';
import PagingRequest from "@/app/models/paging/PagingRequest";
import { useEffect, useState } from 'react';
import { handleRedirect } from '@/app/utils/HelperFunctions';
import { getAlbums } from '@/lib/services/client/album/albumService';

export default function TopAreaComic({ locale, roleUser }: { locale: any, roleUser: any }) {
    const t = useTranslations('home');
    const [albumsDay, setAlbumsDay] = useState<any>();
    const [albumsMonth, setAlbumsMonth] = useState<any>();
    const [albumsYear, setAlbumsYear] = useState<any>();
    const [loading, setLoading] = useState(true);

    const pagingParams: PagingRequest = {
        PageNumber: 1,
        PageSize: 5,
        SearchTerm: '',
        SortColumn: 'viewByTopType',
        SortDirection: 'desc',
    };

    const filterTypes = ['day', 'month', 'year'];

    const createFilters = (type: string): any => ({
        firstChar: '',
        genre: '',
        country: '',
        year: '',
        status: false,
        language: '',
        rating: '',
        topType: type,
        region: locale
    });

    const fetchData = async (filters: any, setAlbums: (data: any) => void) => {
        const response = await getAlbums(pagingParams, filters);
        if (response && response.data) {
            setAlbums(response.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        filterTypes.forEach(async (type) => {
            const filters = createFilters(type);
            await fetchData(filters, type === 'day' ? setAlbumsDay : type === 'month' ? setAlbumsMonth : setAlbumsYear);
        });
    }, []);

    return (
        <>
            {/*=====================================*/}
            {/*=           top Area Start          =*/}
            {/*=====================================*/}
            <section className="top sec-mar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                            <h3>Top {t('day')}</h3>
                            {albumsDay?.map((album: any) => (
                                <div key={album.id} className="anime-box style-2 bg-color-black">
                                    <a onClick={()=>handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)}>
                                        <div className="row m-0">
                                            <div className="p-0 col-4">
                                                <img
                                                    src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title}
                                                />
                                            </div>
                                            <div className="p-0 col-8">
                                                <div className="anime-blog">
                                                    <p>{album.title}</p>
                                                    <p className="text">{album?.lastCollectionTitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                            <h3>Top {t('month')}</h3>
                            {albumsMonth?.map((album: any) => (
                                <div key={album.id} className="anime-box style-2 bg-color-black">
                                    <a onClick={()=>handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)}>
                                        <div className="row m-0">
                                            <div className="p-0 col-4">
                                                <img
                                                    src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title}
                                                />
                                            </div>
                                            <div className="p-0 col-8">
                                                <div className="anime-blog">
                                                    <p>{album.title}</p>
                                                    <p className="text">{album?.lastCollectionTitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-3 offset-sm-2 col-12">
                            <h3>Top {t('year')}</h3>
                            {albumsYear?.map((album: any) => (
                                <div key={album.id} className="anime-box style-2 bg-color-black">
                                    <a onClick={()=>handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)}>
                                        <div className="row m-0">
                                            <div className="p-0 col-4">
                                                <img
                                                    src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title}
                                                />
                                            </div>
                                            <div className="p-0 col-8">
                                                <div className="anime-blog">
                                                    <p>{album.title}</p>
                                                    <p className="text">{album?.lastCollectionTitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}