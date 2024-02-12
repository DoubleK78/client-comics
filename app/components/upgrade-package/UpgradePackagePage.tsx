"use client"
import { getEnumValueFromString, getRoleBadge } from "@/app/utils/HelperFunctions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function UpgradePackagePage({ session }: { session: any }) {
    const t = useTranslations('upgrade');
    const [currentPackage, setCurrentPackage] = useState<any>("12/04/2024");
    const roleUser = getEnumValueFromString((session.user?.token?.roles ? session.user.token.roles : []).join(','));

    useEffect(() => {

    }, []);
    return (
        <section className="blog style-1 sec-mar">
            <div className="container">
                <div className="heading style-1">
                    <h2>{t('upgrade_package')}</h2>
                    {session &&
                        <>
                            <p className="package-now">{t('current_package')}
                                <div className="profile-tag">
                                    {getRoleBadge(roleUser)}
                                </div>
                            </p>
                            <p className="package-now">{t('expires_on')} <div>{currentPackage}</div></p>
                        </>
                    }
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                        <a href="/detail-package?package=premium" className="inner-box">
                            <div className="image-box">
                                <img src="/assets/media/banner/premium.jpg" alt="" className="attachment-full size-full" />
                            </div>
                            <div className="author-box text-start">
                                <div className="detail d-flex align-items-center justify-content-between">
                                    <p className="glitter-text">19.000 {t('money')}</p>
                                    <p className="glitter-text">30 {t('days')}</p>
                                </div>
                                <h4 className="glitter-text">{t('premium')}</h4>
                                <div className="d-flex align-items-center">
                                    <h5 className="glitter-text">{t('benefit')}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                        <a href="/detail-package?package=spremium" className="inner-box">
                            <div className="image-box">
                                <img src="/assets/media/banner/s-premium.jpg" alt="" className="attachment-full size-full" />
                            </div>
                            <div className="author-box text-start">
                                <div className="detail d-flex align-items-center justify-content-between">
                                    <p className="s-glitter-text">49.000 {t('money')}</p>
                                    <p className="s-glitter-text">30 {t('days')}</p>
                                </div>
                                <h4 className="s-glitter-text">{t('s-premium')}</h4>
                                <div className="d-flex align-items-center">
                                    <h5 className="s-glitter-text">{t('s-benefit')}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}