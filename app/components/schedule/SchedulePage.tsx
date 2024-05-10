"use client"
import { AlbumScheduleRequestModel, EDate } from "@/app/models/album/AlbumScheduleRequestModel";
import { ERegion } from "@/app/models/comics/ComicSitemap";
import { ERoleType } from "@/app/models/enums/ERoleType";
import { getScheduleAlbums } from "@/lib/services/client/album/albumService";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function SchedulePage({ locale, roleUser }: { locale: any, roleUser: any }) {
    const t = useTranslations('home');
    const [schedules, setSchedules] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(EDate.Sunday);

    useEffect(() => {
        const requestModel: AlbumScheduleRequestModel = {
            dateRelease: date,
            region: locale === 'vi' ? ERegion.vn : ERegion.en
        };
        console.log(roleUser)
        setLoading(false)
        getScheduleAlbums(requestModel).then((response: any) => {
            if (response) {
                setSchedules(response);
                setLoading(false);
            }
        });
    }, [date]);

    const renderSchedules = () => {
        return (
            <>
                {(roleUser === ERoleType.UserPremium || roleUser === ERoleType.UserSuperPremium) ?
                    (
                        <>
                            {loading && (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            {schedules && schedules.length > 0 && schedules.map((schedule: any, index: any) => (
                                <div key={index}>
                                    <a href={schedule.url}>
                                        <div className="row  align-items-center">
                                            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-0">
                                                <p className="text">{schedule.timeRelease}</p>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-10 col-12">
                                                <div className="row  align-items-center">
                                                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-3 ps-0 pe-0 text-end">
                                                        <img src={schedule.backgroundUrl} alt="" />
                                                    </div>
                                                    <div className="col-xl-7 col-lg-8 col-md-7 col-sm-7 col-9">
                                                        <div className="schedule-content align-middle">
                                                            <p className="small-title">{schedule.title}</p>
                                                            <p className="text-box">{locale}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3 col-lg-2 col-md-3 col-sm-3 col-0">
                                                        <p className="text text-end">{schedule.type}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-0 col-0 text-end">
                                                <p className="text">{t('on_going')}</p>
                                            </div>
                                        </div>
                                    </a>
                                    <hr />
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <p>{t('priority_pre')}</p>
                            <p>{t('refer')} <a style={{color: 'var(--color-primary)', display: 'inline-block'}} href="/upgrade-package">{t('here')}</a></p>
                        </>
                    )}
            </>
        )
    }
    return (
        <section className="schedule style-1 sec-mar">
            <div className="container">
                <div className="heading style-1">
                    <h2>{t('weekly_schedule')}</h2>
                </div>
                <div className="schedule-box">
                    <div className="card">
                        <div className="card-header">
                            <ul className="date-slider nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                                <li className="nav-item">
                                    <a className="nav-link text-center active" aria-current="true" data-bs-toggle="tab"
                                        href="home.html#sunday" onClick={() => setDate(EDate.Sunday)}>
                                        <h2>{t('sun')}</h2>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                        href="home.html#monday" onClick={() => setDate(EDate.Monday)}>
                                        <h2>{t('mon')}</h2>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                        href="home.html#tuesday" onClick={() => setDate(EDate.Tuesday)}>
                                        <h2>{t('tue')}</h2>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                        href="home.html#wednesday" onClick={() => setDate(EDate.Wednesday)}>
                                        <h2>{t('wed')}</h2>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                        href="home.html#thursday" onClick={() => setDate(EDate.Thursday)}>
                                        <h2>{t('thu')}</h2>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                        href="home.html#friday" onClick={() => setDate(EDate.Friday)}>
                                        <h2>{t('fri')}</h2>
                                    </a>
                                </li>
                                <li className="nav-item" onClick={() => setDate(EDate.Saturday)}>
                                    <a className="nav-link text-center" aria-current="true" data-bs-toggle="tab"
                                        href="home.html#saturday">
                                        <h2>{t('sat')}</h2>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body style-1 tab-content">
                            <div className="tab-pane active" id="sunday">
                                {renderSchedules()}
                            </div>
                            <div className="tab-pane" id="monday">
                                {renderSchedules()}
                            </div>
                            <div className="tab-pane" id="tuesday">
                                {renderSchedules()}
                            </div>
                            <div className="tab-pane" id="wednesday">
                                {renderSchedules()}
                            </div>
                            <div className="tab-pane" id="thursday">
                                {renderSchedules()}
                            </div>
                            <div className="tab-pane" id="friday">
                                {renderSchedules()}
                            </div>
                            <div className="tab-pane" id="saturday">
                                {renderSchedules()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}