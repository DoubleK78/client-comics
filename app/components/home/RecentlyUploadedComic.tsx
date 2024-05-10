"use client"
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import FollowingRequestModel from '@/app/models/comics/FollowingRequestModel';
import { converPrefixtUrlByLocale, followAlbum, getLangByLocale, getStatusFollow, getUserNameClass, handleRedirect, shortNumberViews, unFollow } from '@/app/utils/HelperFunctions';
import { pathnames } from '@/navigation';

export default function RecentlyUploadedComic({ roleUser, albums, isBot }: { roleUser: any, albums: any, isBot: boolean }) {
    const t = useTranslations('home');
    const locale = useLocale();
    const [loadingFollow, setLoadingFollow] = useState(true);
    const [statusFollow, setStatusFollow] = useState(null);

    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const handleDropdownToggle = async (albumId: any) => {
        const followModel: FollowingRequestModel = {
            AlbumId: albumId
        };

        var result = await getStatusFollow(followModel);
        setStatusFollow(result);

        if (result != null)
            setLoadingFollow(false);
    };

    const handleFollow = async (albumId: any) => {
        const followModel: FollowingRequestModel = {
            AlbumId: albumId
        };

        await followAlbum(followModel);
    };

    const handleUnfollow = async (albumId: any) => {
        const followModel: FollowingRequestModel = {
            AlbumId: albumId
        };

        await unFollow(followModel);
    };

    const closeDropdown = () => {
        setStatusFollow(null);
        setLoadingFollow(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/*=====================================*/}
            {/*=        Popular Anime Area Start =*/}
            {/*=====================================*/}
            <section className="popular style-2  sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h1 className={getUserNameClass(roleUser)} style={{height: '70px'}}> {t('recently_uploaded')}
                            <a href="/top-page?typePage=&sort=updateDate">
                                <span className="view-more">{t('view_more')}</span>
                            </a>
                        </h1>
                    </div>
                    {albums && albums.length === 0 && (
                        <div className="no-data-message">
                            {t('no_data')}
                        </div>
                    )}
                    <div className="row">
                        {albums?.map((album: any) => (
                            <div key={album.id} className="col-lg-2 col-sm-6 col-12 comic-element">
                                <div className="anime-blog">
                                    {!isBot && (
                                        <>
                                            <a className="img-block" onClick={() => handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)}>
                                                <img loading='lazy' src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title} />
                                            </a>
                                            <a onClick={() => handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)} className="action-overlay"><i className="fa fa-eye" aria-hidden="true"></i> {t('read_now')}</a>
                                        </>
                                    )}
                                    {isBot && (
                                        <>
                                            <a className="img-block" href={`${converPrefixtUrlByLocale(pathnames['/comics'][getLangByLocale(locale)], locale)}/${album.friendlyName}`}>
                                                <img loading='lazy' src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title} />
                                            </a>
                                            <a href={`${converPrefixtUrlByLocale(pathnames['/comics'][getLangByLocale(locale)], locale)}/${album.friendlyName}`} className="action-overlay"><i className="fa fa-eye" aria-hidden="true"></i> {t('read_now')}</a>
                                        </>
                                    )}
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className="text">{t('views')}: {shortNumberViews(album.views)}</p>
                                            <p className="chap-box">{album.lastCollectionTitle}</p>
                                        </div>
                                        <div className="dropdown">
                                            {roleUser !== -1 &&
                                                <>
                                                    <button
                                                        type="button"
                                                        className="dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        onClick={() => handleDropdownToggle(album.id)}
                                                    >
                                                        <svg
                                                            width={32}
                                                            height={22}
                                                            viewBox="0 0 32 22"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect
                                                                x="0.145264"
                                                                y="0.00012207"
                                                                width="21.4395"
                                                                height="2.68125"
                                                                rx="1.34062"
                                                                fill="#999999"
                                                            />
                                                            <rect
                                                                x="0.145264"
                                                                y="7.41272"
                                                                width="21.4395"
                                                                height="2.68125"
                                                                rx="1.34062"
                                                                fill="#999999"
                                                            />
                                                            <rect
                                                                x="0.145264"
                                                                y="14.8258"
                                                                width="16.4914"
                                                                height="2.68125"
                                                                rx="1.34062"
                                                                fill="#999999"
                                                            />
                                                            <path
                                                                d="M19.8784 16.0712C19.8784 15.4163 20.4093 14.8854 21.0642 14.8854H30.2463C30.9011 14.8854 31.432 15.4163 31.432 16.0712C31.432 16.7261 30.9011 17.257 30.2463 17.257H21.0642C20.4093 17.257 19.8784 16.7261 19.8784 16.0712Z"
                                                                fill="#999999"
                                                            />
                                                            <path
                                                                d="M25.6552 22.0001C25.0171 22.0001 24.4999 21.4828 24.4999 20.8447V11.2977C24.4999 10.6596 25.0171 10.1423 25.6552 10.1423C26.2933 10.1423 26.8106 10.6596 26.8106 11.2977V20.8447C26.8106 21.4828 26.2933 22.0001 25.6552 22.0001Z"
                                                                fill="#999999"
                                                            />
                                                        </svg>
                                                    </button>
                                                </>
                                            }
                                            <ul ref={dropdownRef} className="dropdown-menu bg-color-black pt-3 pb-3 ps-3 pe-3">
                                                <li>
                                                    {statusFollow == true && (
                                                        <>
                                                            <a className="follow" onClick={() => handleUnfollow(album.id)}>
                                                                <i className="fa fa-times" /> {t('unfollow')}{" "}
                                                            </a>
                                                        </>
                                                    )}

                                                    {statusFollow == false && (
                                                        <>
                                                            <a className="follow" onClick={() => handleFollow(album.id)}>
                                                                <i className="fa fa-plus" /> {t('follow')}{" "}
                                                            </a>
                                                        </>
                                                    )}

                                                    {loadingFollow && (
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {!isBot && <a className='title-album-home' onClick={() => handleRedirect(`truyen-tranh/${album.friendlyName}`, roleUser)}>
                                        <p>{album.title}</p>
                                    </a>}
                                    {isBot && <a className='title-album-home' href={`${converPrefixtUrlByLocale(pathnames['/comics'][getLangByLocale(locale)], locale)}/${album.friendlyName}`}>
                                        <p>{album.title}</p>
                                    </a>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}