"use client"
import { useTranslations } from "next-intl";
import PagingRequest from "@/app/models/paging/PagingRequest";
import axiosClientApiInstance from "@/lib/services/client/interceptor";
import ServerResponse from "@/app/models/common/ServerResponse";
import { portalServer } from "@/lib/services/client/baseUrl";
import { useEffect, useMemo, useState } from "react";
import FollowingRequestModel from "@/app/models/comics/FollowingRequestModel";
import { unFollow } from "@/app/utils/HelperFunctions";

const getFollowings = async (params: PagingRequest) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>(portalServer + '/api/following/paging', {
            params: { ...params },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};

export default function Following({ session }: { session: any }) {
    const t = useTranslations('profile');
    const [followings, setFollowings] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [toggleRemove, setToggleRemove] = useState(false);
    const [isHistoryPage, setIsHistoryPage] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [pagingParams, setPagingParams] = useState<PagingRequest>({
        PageNumber: 1,
        PageSize: 6,
        SearchTerm: '',
        SortColumn: 'createdOnUtc',
        SortDirection: 'desc'
    });

    const handleUnfollow = async (albumId: any) => {
        const followModel: FollowingRequestModel = {
            AlbumId: albumId
        };
        await unFollow(followModel);
        setToggleRemove(!toggleRemove);
    };

    const handlePageClick = (page: number) => {
        setPagingParams({ ...pagingParams, PageNumber: page });
    };
    const handlePrevClick = () => {
        const prevPage = pagingParams.PageNumber - 1;
        if (prevPage >= 1) {
            setPagingParams({ ...pagingParams, PageNumber: prevPage });
        }
    };

    const handleNextClick = () => {
        const nextPage = pagingParams.PageNumber + 1;
        if (nextPage <= totalPages) {
            setPagingParams({ ...pagingParams, PageNumber: nextPage });
        }
    };
    const renderPagination = useMemo(() => {
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (
            <ul className="pagination">
                <li className="page-item">
                    <a className="hover page-link arrow" aria-label="Previous" onClick={handlePrevClick}>
                        <i className="fa fa-chevron-left"></i>
                    </a>
                </li>
                {pages.map((page) => (
                    <li key={page} className="page-item">
                        <a className={`hover page-link ${page === pagingParams.PageNumber ? 'active' : ''}`} onClick={() => handlePageClick(page)}>{page}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="hover page-link arrow" aria-label="Next" onClick={handleNextClick}>
                        <i className="fa fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        );
    }, [pagingParams.PageNumber, totalPages]);

    useEffect(() => {
        getFollowings(pagingParams).then((response: any) => {
            if (response && response.data) {
                setFollowings(response.data);
                setTotalPages(Math.ceil(response.rowNum / pagingParams.PageSize))
                if (response.data != null)
                    setLoading(false)
            }
        });
    }, [toggleRemove]);

    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="/profile">{t('profile')}</a></li>
                            <li><a className="active">{t('following_history')}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="schedule style-3  sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h2>{t('playlist')}</h2>
                    </div>
                    <div className="row">
                        <div className="col-xl-9 col-sm-12 col-12">
                            <div className="schedule-box">
                                <div className="card">
                                    <div className="card-header">
                                        <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                                            <li className="nav-item">
                                                <a className="nav-link text-center active" aria-current="true" data-bs-toggle="tab"
                                                    href="playlist.html#later" onClick={() => setIsHistoryPage(false)}>
                                                    <h2>{t('following')}</h2>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                                    href="playlist.html#playlist" onClick={() => setIsHistoryPage(true)}>
                                                    <h2>{t('reading_history')}</h2>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body style-1 tab-content">
                                        <div className="row justify-content-between ps-3 pe-3 pb-4">
                                            <div className="col-lg-6 col-sm-6 col-12">
                                                <h4 className="d-inline">{t('name')}</h4>
                                            </div>
                                            <div className="col-lg-6 col-sm-6 col-0 text-end">
                                                <h4 className="space-right d-inline">{t('views')}</h4>
                                                <h4 className="d-inline">{t('lastest_name')}</h4>
                                            </div>
                                        </div>
                                        <div className="tab-pane active" id="later">
                                            {loading && (
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div className="spinner-border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            )}
                                            {followings && followings.length > 0 &&
                                                <>
                                                    {followings?.map((fl: any) => (
                                                        <>
                                                            <div className="row ps-3 pe-3">
                                                                <div className="col-xl-6 col-lg-8 col-12 col-md-7 col-sm-8">
                                                                    <div className="row">
                                                                        <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                            <a href={`truyen-tranh/${fl.friendlyName}`}>
                                                                                <img src={fl.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={fl.title} />
                                                                            </a>
                                                                        </div>
                                                                        <div className="col-lg-10 col-sm-9 col-9">
                                                                            <div className="schedule-content align-middle align-middle">
                                                                                <a href={`truyen-tranh/${fl.friendlyName}`}>
                                                                                    <p className="small-title">{fl.title}</p>
                                                                                </a>
                                                                                <a className="follow" onClick={() => handleUnfollow(fl.albumId)}>
                                                                                    <p className="text-box"><i className="fa fa-times" /> {t('unfollow')}</p>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                                    <p className="space-right d-inline">{fl.views.toLocaleString()}</p>
                                                                </div>
                                                                <div className=" col-xl-3 col-lg-2 col-md-3 col-sm-2 col-0 space-top text-end">
                                                                    <p className="d-inline">{fl.lastCollectionTitle}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </>
                                                    ))}
                                                </>
                                            }
                                            {!loading && followings && followings.length === 0 && (
                                                <div className="no-data-message">
                                                    No data available.
                                                </div>
                                            )}
                                        </div>
                                        <div className="tab-pane" id="playlist">
                                            <a href="streaming-season.html">
                                                <div className="row ps-3 pe-3">
                                                    <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                        <div className="row">
                                                            <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                <img src="assets/media/anime-sm-img/anime-img-2.png" alt="" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-9">
                                                                <div className="schedule-content align-middle">
                                                                    <p className="small-title">Darling in the Franxx!</p>
                                                                    <p className="text-box">dub 8</p>
                                                                    <p className="text-box">sub 12</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                        <p className="space-right d-inline">Season 04</p>
                                                        <p className="d-inline">Episode 04</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr />
                                            <a href="streaming-season.html">
                                                <div className="row ps-3 pe-3">
                                                    <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                        <div className="row">
                                                            <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                <img src="assets/media/anime-sm-img/anime-img-3.png" alt="" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-9">
                                                                <div className="schedule-content align-middle">
                                                                    <p className="small-title">Plastic Memories</p>
                                                                    <p className="text-box">dub 8</p>
                                                                    <p className="text-box">sub 12</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                        <p className="space-right d-inline">Season 06</p>
                                                        <p className="d-inline">Episode 06</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr />
                                            <a href="streaming-season.html">
                                                <div className="row ps-3 pe-3">
                                                    <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                        <div className="row">
                                                            <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                <img src="assets/media/anime-sm-img/anime-img-4.png" alt="" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-9">
                                                                <div className="schedule-content align-middle">
                                                                    <p className="small-title">That Time I Reincarnated As a Slime
                                                                        Season 2</p>
                                                                    <p className="text-box">dub 8</p>
                                                                    <p className="text-box">sub 12</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                        <p className="space-right d-inline">Season 12</p>
                                                        <p className="d-inline">Episode 12</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr />
                                            <a href="streaming-season.html">
                                                <div className="row ps-3 pe-3">
                                                    <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                        <div className="row">
                                                            <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                <img src="assets/media/anime-sm-img/anime-img-5.png" alt="" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-9">
                                                                <div className="schedule-content align-middle">
                                                                    <p className="small-title">Assassination classNameroom</p>
                                                                    <p className="text-box">dub 8</p>
                                                                    <p className="text-box">sub 12</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                        <p className="space-right d-inline">Season 09</p>
                                                        <p className="d-inline">Episode 09</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr />
                                            <a href="streaming-season.html">
                                                <div className="row ps-3 pe-3">
                                                    <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                        <div className="row">
                                                            <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                <img src="assets/media/anime-sm-img/anime-img-6.png" alt="" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-9">
                                                                <div className="schedule-content align-middle">
                                                                    <p className="small-title">Chainsaw Man</p>
                                                                    <p className="text-box">dub 8</p>
                                                                    <p className="text-box">sub 12</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                        <p className="space-right d-inline">Season 20</p>
                                                        <p className="d-inline">Episode 20</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr />
                                            <a href="streaming-season.html">
                                                <div className="row ps-3 pe-3">
                                                    <div className="col-xl-7 col-lg-8 col-12 col-md-7 col-sm-8">
                                                        <div className="row">
                                                            <div className="col-lg-2 col-sm-3 col-3 ps-0 space-left pe-0 text-end">
                                                                <img src="assets/media/anime-sm-img/anime-img-1.png" alt="" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 col-9">
                                                                <div className="schedule-content align-middle">
                                                                    <p className="small-title">No Game No Life Zero</p>
                                                                    <p className="text-box">dub 8</p>
                                                                    <p className="text-box">sub 12</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-xl-5 col-lg-4 col-md-5 col-sm-4 col-0 space-top text-end">
                                                        <p className="space-right d-inline">Season 22</p>
                                                        <p className="d-inline">Episode 22</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-12 order">
                            <div className="row align-items-end">
                                <div className="col-lg-12 col-sm-8 col-6">
                                    <div className="img-box">
                                        <img src={session.user?.image ?? ''} alt="Avatar" className="rounded-circle shadow-4 px-2" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-6 col-6">
                                    <p className="small-text pt-1">{session.user?.email}</p>
                                    <a href="/profile" className="d-inline"><h3>{session.user?.name}</h3></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!isHistoryPage &&
                        <div className="pagination-wrape">
                            {renderPagination}
                        </div>
                    }
                </div>
            </section>
        </>
    );
}