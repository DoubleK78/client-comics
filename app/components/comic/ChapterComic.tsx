"use client"
import ContentResponse from "@/app/models/contents/ContentResponse";
import { countryFlags, handleRedirect, shortNumberViews } from "@/app/utils/HelperFunctions";
import dayjs from "@/lib/dayjs/dayjs-custom";
import { useTranslations } from 'next-intl';
import PagingRequest from "@/app/models/paging/PagingRequest";
import { useEffect, useState } from "react";
import { getAlbums } from "@/lib/services/client/album/albumService";

export default function ChapterComic({ contents, locale, roleUser, genre, comicId, region }: {
    contents?: ContentResponse[] | null, locale: any, roleUser: any, genre: any, comicId: any, region: any
}) {
    const t = useTranslations('comic_detail');
    const checkVisibility = (createdOnUtc: any) => {
        const currentTime = dayjs();
        const createdTime = dayjs.utc(createdOnUtc).local();
        const timeDifference = currentTime.diff(createdTime, 'hours');
        return timeDifference <= 4;
    };
    const [albums, setAlbums] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [pagingParams] = useState<PagingRequest>({
        PageNumber: 1,
        PageSize: 4,
        SearchTerm: genre,
        SortColumn: 'views',
        SortDirection: 'desc'
    });

    const [filter] = useState({
        firstChar: '',
        genre: '',
        country: '',
        year: '',
        status: false,
        language: '',
        rating: '',
        region: region
    });

    useEffect(() => {
        getAlbums(pagingParams, filter).then((response: any) => {
            if (response && response.data) {
                setAlbums(response.data);
                if (response.data != null)
                    setLoading(false)
            }
        });
    }, []);

    return (
        <>
            {/*=====================================*/}
            {/*=         Release Area Start         =*/}
            {/*=====================================*/}
            <section className="relese sec-mar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <h3 className="small-title">{t('chapter_list')}</h3>
                            <div className=" chapter-list-container">
                                {contents?.map((content, index) => (
                                    <div key={index}>
                                        <h5 className="chapter-list">
                                            <a onClick={()=>handleRedirect(`/truyen-tranh/${content.albumFriendlyName}/${content.friendlyName}`, roleUser)}>{content.title}</a>
                                            <div className="new-chap">
                                                {checkVisibility(content.createdOnUtc) &&
                                                    <>
                                                        <p>new</p>
                                                    </>
                                                }
                                            </div>
                                            {(roleUser && roleUser >= content.levelPublic) || content.levelPublic == 0 ?
                                                (
                                                    <>
                                                        {locale == 'vi' ? (
                                                            <>
                                                                <span>{dayjs.utc(content.createdOnUtc).local().format('DD-MM-YYYY HH:mm')}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>{dayjs.utc(content.createdOnUtc).format('DD-MM-YYYY HH:mm')}</span>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span>{t('priority')}</span>
                                                )}
                                            <p><i className="fas fa-eye"></i> {shortNumberViews(content.views)}</p>
                                        </h5>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-3 offset-sm-2 mt-lg-0 mt-3">
                            <h3 className="small-title">{t('similar')}</h3>
                            {loading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {!loading && albums && albums.length === 0 && (
                                <div className="no-data-message">
                                    {t('no_data1')}
                                </div>
                            )}
                            {albums && albums?.filter((x: any) => x.id !== comicId).map((album: any) => (
                                <div key={album.id} className="anime-box bg-color-black">
                                    <a onClick={()=>handleRedirect(`${album.friendlyName}`, roleUser)}>
                                        <div className="row m-0">
                                            <div className="p-0 col-2">
                                                <img src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title} />
                                            </div>
                                            <div className="p-0 col-9">
                                                <div className="anime-blog">
                                                    <p>{album.title}</p>
                                                    <p className="text-box">{album.lastCollectionTitle}</p>
                                                </div>
                                            </div>
                                            <div className="p-0 col-1 show-type">
                                                <span className="show-type">{album.tags && <span className={(countryFlags as any)[album.tags]}></span>}</span>
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
    )
}