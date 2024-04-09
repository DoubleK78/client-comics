"use client"
import ContentResponse from "@/app/models/contents/ContentResponse";
import { converPrefixtUrlByLocale, countryFlags, getDayjsByLocale, getLangByLocale, handleRedirect, percentBanner, shortNumberViews } from "@/app/utils/HelperFunctions";
import { useTranslations } from 'next-intl';
import PagingRequest from "@/app/models/paging/PagingRequest";
import { useEffect, useState } from "react";
import { getAlbums } from "@/lib/services/client/album/albumService";
import { pathnames } from "@/navigation";
import ChapterComicItem from "./ChapterComicItem";
import dynamic from "next/dynamic";

const DynamicAdUnit = dynamic(() => import('@/app/components/analytics/AdUnit'), {
    ssr: false
})

export default function ChapterComic({ contents, locale, roleUser, genre, comicId, region, isBot }: {
    contents?: ContentResponse[] | null, locale: any, roleUser: any, genre: any, comicId: any, region: any, isBot: boolean
}) {
    const t = useTranslations('comic_detail');
    const routeChapter = locale === 'vi' ? pathnames['/comics/[comicid]/[contentid]'][getLangByLocale(locale)] : `/${getLangByLocale(locale)}${pathnames['/comics/[comicid]/[contentid]'][getLangByLocale(locale)]}`;

    const checkVisibility = (createdOnUtc: any) => {
        const currentTime = getDayjsByLocale(locale);
        const createdTime = getDayjsByLocale(locale, createdOnUtc);
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

    const generateContentUrlByLocale = (template: string, comicId: string, contentId: string) => {
        return template.replace('[comicid]', comicId).replace('[contentid]', contentId);
    }

    return (
        <>
            {/*=====================================*/}
            {/*=         Release Area Start         =*/}
            {/*=====================================*/}
            <section className="relese sec-mar">
                <div className="container">
                    {process.env.activeBanner && percentBanner(roleUser) && (
                        <div className="row">
                            <div className="col">
                                <DynamicAdUnit />
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <h3 className="small-title">{t('chapter_list')}</h3>
                            <div className="chapter-list-container">
                                {contents?.map((content, index) => (
                                    <div key={index}>
                                        <h5 className="chapter-list">
                                            {!isBot && <ChapterComicItem title={content.title} albumFriendlyName={content.albumFriendlyName} collectionfriendlyName={content.friendlyName} onClick={() => handleRedirect(`/truyen-tranh/${content.albumFriendlyName}/${content.friendlyName}`, roleUser)} />}
                                            {isBot && <a href={`${generateContentUrlByLocale(routeChapter, content.albumFriendlyName ?? '', content.friendlyName ?? '')}`}>{content.title}</a>}
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
                                                                <span>{getDayjsByLocale(locale, content.createdOnUtc).format('DD-MM-YYYY HH:mm')}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>{getDayjsByLocale(locale, content.createdOnUtc).format('DD-MM-YYYY HH:mm')}</span>
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
                                    {!isBot && (
                                        <a onClick={() => handleRedirect(`${album.friendlyName}`, roleUser)}>
                                            <div className="row m-0">
                                                <div className="p-0 col-2">
                                                    <img loading="lazy" src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title} />
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
                                    )}
                                    {isBot && (
                                        <a href={`${converPrefixtUrlByLocale(pathnames['/comics'][getLangByLocale(locale)], locale)}/${album.friendlyName}`}>
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
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}