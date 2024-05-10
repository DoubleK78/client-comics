"use client"
import { ERegion } from "@/app/models/comics/ComicSitemap";
import { getHoverText, getLevelBadgeClass, getLevelNameById, getProgressBar, getRoleBadge, getUserClass, getUserNameClass, imageLevel } from "@/app/utils/HelperFunctions";
import { getTopRankUsers } from "@/lib/services/client/user/userService";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getPercentByDivdeTwoNumber } from "@/lib/math/mathHelper";
import Pagination from "../common/Pagination";
import PagingRequest from "@/app/models/paging/PagingRequest";

export default function UpgradePackagePage() {
    const t = useTranslations('search');
    const [region, setRegion] = useState<any>(ERegion.vn);
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pagingParams, setPagingParams] = useState<PagingRequest>({
        PageNumber: 1,
        PageSize: 10,
        SearchTerm: '',
        SortColumn: '',
        SortDirection: 'asc'
    });

    const handleTabChange = (selectedRegion: ERegion) => {
        setPagingParams({
            PageNumber: 1,
            PageSize: 10,
            SearchTerm: '',
            SortColumn: '',
            SortDirection: 'asc'
        });
        setRegion(selectedRegion);
    };

    useEffect(() => {
        setLoading(true);
        getTopRankUsers(pagingParams, region).then((response: any) => {
            if (response && response.data) {
                setUsers(response.data);
                setTotalRecords(response.rowNum);
                setLoading(false);
            }
        });
    }, [region, pagingParams]);

    const renderUsers = () => {
        return (
            <>
                {loading && (
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                {users && users.length > 0 && users.map((user: any, index: any) => (
                    <div key={index} className="top-user">
                        <div className="col-lg-1 col-2 user-top-level">
                            <a data-hover-text={getHoverText(user.roleType)} className={getUserClass(user.roleType)}>
                                <img src={user.avatar} alt="" />
                            </a>
                            <span className={getLevelBadgeClass(user.roleType)}>{getLevelNameById(user.levelId)}</span>
                        </div>
                        <div className="col-lg-7 col-7 item-top-user">
                            <h5>
                                {getRoleBadge(user.roleType)}
                                <a href="#" className={getUserNameClass(user.roleType)}>{user.userName}</a>
                            </h5>
                            <div className="progress-container full-progress">
                                {getProgressBar(user.roleType, getPercentByDivdeTwoNumber(user.currentExp, user.nextLevelExp))}
                            </div>
                        </div>
                        <div className="col-lg-3 col-2">
                            <img className="level-image" src={imageLevel(user.levelId)} alt="" />
                        </div>
                        <div>
                            <h1 className={(index === 0 && pagingParams.PageNumber === 1) ? "s-glitter-text" : ""}>{index + 1 + (pagingParams.PageNumber - 1)*10}</h1>
                        </div>
                    </div>
                ))}
            </>
        )
    }
    return (
        <>
            {/* <!--=====================================-->
            <!--=      Breadcrumb Area Start        =-->
            <!--=====================================--> */}
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="/">{t('home_page')}</a></li>
                            <li><a className="active">{t('top_power')}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="anime sec-mar">
                <div className="container">
                    {/* Navigation Tabs */}
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${region === ERegion.vn ? 'active' : ''}`} id="vn-tab" data-bs-toggle="tab" data-bs-target="#vn" type="button" role="tab" aria-controls="vn" aria-selected="true" onClick={() => handleTabChange(ERegion.vn)}>{t('vietnam')}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${region === ERegion.en ? 'active' : ''}`} id="en-tab" data-bs-toggle="tab" data-bs-target="#en" type="button" role="tab" aria-controls="en" aria-selected="false" onClick={() => handleTabChange(ERegion.en)}>{t('another_nation')}</button>
                        </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        {/* Tab Content for VN */}
                        <div className={`tab-pane fade ${region === ERegion.vn ? 'show active' : ''}`} id="vn" role="tabpanel" aria-labelledby="vn-tab">
                            {renderUsers()}                      
                        </div>
                        {/* Tab Content for EN */}
                        <div className={`tab-pane fade ${region === ERegion.en ? 'show active' : ''}`} id="en" role="tabpanel" aria-labelledby="en-tab">
                            {renderUsers()}
                        </div>
                    </div>
                </div>
                <div className="pagination-wrape">
                    <Pagination
                        pageIndex={pagingParams.PageNumber}
                        totalCounts={totalRecords}
                        pageSize={pagingParams.PageSize}
                        onPageChange={page => setPagingParams({ ...pagingParams, PageNumber: page })} />
                </div>
            </section>
        </>
    );
}
