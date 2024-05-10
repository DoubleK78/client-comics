"use client"
import { getDayjsByLocale, getEnumValueFromString, getRoleBadge } from "@/app/utils/HelperFunctions";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import Premium from '@/public/assets/media/banner/premium.jpg';
import SPremium from '@/public/assets/media/banner/s-premium.jpg';
import Image from "next/image";
import { ERoleType } from "@/app/models/enums/ERoleType";

export default function UpgradePackagePage({ session }: { session: any }) {
    const t = useTranslations('upgrade');
    const locale = useLocale();
    const roleUser = getEnumValueFromString(session.user?.token?.roles);

    useEffect(() => {

    }, []);
    return (
        <section className="blog style-1 sec-mar">
            <div className="container">
                <div className="heading style-1">
                    <h1>{t('upgrade_package')}</h1>
                    {session && (roleUser === ERoleType.UserPremium || roleUser === ERoleType.UserSuperPremium) &&
                        <>
                            <p className="package-now">{t('current_package')}
                                <div className="profile-tag">
                                    {getRoleBadge(roleUser)}
                                </div>
                            </p>
                            <p className="package-now duration">{t('expires_on')}:
                                <div>
                                    {session?.user?.token?.expriedRoleDate ? getDayjsByLocale(locale, session.user.token.expriedRoleDate).format('DD-MM-YYYY') : t('forever')}
                                </div>
                            </p>
                        </>
                    }
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                        <a href="/detail-package?package=premium" className="inner-box">
                            <div className="image-box">
                                <Image src={Premium} alt="" className="attachment-full size-full" priority />
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
                                <Image src={SPremium} alt="" className="attachment-full size-full" priority />
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