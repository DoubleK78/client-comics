"use client";
import { useEffect, useState } from 'react'
import { useTranslations } from "next-intl";
import { countryFlags, handleRedirect, shortNumberViews } from '@/app/utils/HelperFunctions';
import Pagination from '../common/Pagination';

export default function ComicSearchResult({ albums, totalRecords, setPagingParams, pagingParams, roleUser }: { albums: any, totalRecords: number, setPagingParams: any, pagingParams: any, roleUser: any }) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations('search');

    useEffect(() => {
        setLoading(false);
        if (albums == null)
            setLoading(true)
    }, [albums]);

    return (
        <>
            <section className="anime sec-mar">
                <div className="container">
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    {albums && albums.length > 0 &&
                        <>
                            <div className="row">
                                {albums?.map((album: any) => (
                                    <div key={album.id} className="col-lg-4 col-md-6 col-sm-8 offset-md-0 offset-sm-2 col-12">
                                        <div className="anime-box bg-color-black">
                                            <a onClick={() => handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)}>
                                                <div className="row m-0">
                                                    <div className="p-0 col-2">
                                                        <img src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title} />
                                                    </div>
                                                    <div className="p-0 col-9">
                                                        <div className="anime-blog">
                                                            <p>{album.title}</p>
                                                            <div className='view-search'><p className="text">{album?.lastCollectionTitle}</p></div>
                                                            <p className="text">
                                                                <i className="fas fa-eye"></i> {album.viewByTopType !== null ? shortNumberViews(album.viewByTopType) : shortNumberViews(album.views)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="p-0 col-1 show-type">
                                                        <span className="show-type">
                                                            {album.tags && <span className={(countryFlags as any)[album.tags]}></span>}
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pagination-wrape">
                                <Pagination
                                    pageIndex={pagingParams.PageNumber}
                                    totalCounts={totalRecords}
                                    pageSize={pagingParams.PageSize}
                                    onPageChange={page => setPagingParams({ ...pagingParams, PageNumber: page })} />
                            </div>
                        </>
                    }
                    {!loading && albums && albums.length === 0 && (
                        <div className="no-data-message">
                            {t('no_data')}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}