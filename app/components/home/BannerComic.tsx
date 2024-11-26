"use client"
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import ToNotDieBanner from '@/public/assets/media/banner/to_not_die.png';
import VouncherBanner from '@/public/assets/media/banner/voucher.png';
import { getLangByLocale, handleRedirect } from "@/app/utils/HelperFunctions";
import { Link, pathnames } from "@/navigation";
import { ERoleType } from "@/app/models/enums/ERoleType";

export default function BannerComic({ roleUser, isBot }: { roleUser: any, isBot: boolean }) {
    const t = useTranslations('home');
    const locale = useLocale();
    return (
        <>
            {/*=====================================*/}
            {/*=        Banner Area Start          =*/}
            {/*=====================================*/}
            <section className="banner style-3">
                <div className="container-fluid">
                    <div className="container">
                        <div className=" banner-block bg-color-black">
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 col-12 d-flex align-items-center">
                                    <div className="banner-content">
                                        <h1 className="title">{t('to_not_die')}</h1>
                                        <p className="text">{t('season')} 2</p>
                                        <div className="tag-box">
                                            {!isBot && <a onClick={() => handleRedirect("/truyen-tranh/de-co-the-song-sot", roleUser)} className="text-box">
                                                {t('view_now')}
                                            </a>}
                                            {isBot && <Link href={`${pathnames['/comics'][getLangByLocale(locale)]}/de-co-the-song-sot`} className="text-box">
                                                {t('view_now')}
                                            </Link>}
                                        </div>
                                        <p className="light-text">{t('featured_comics')}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-12 ">
                                    <Image
                                        src={ToNotDieBanner}
                                        className="dignole-img show-img"
                                        alt="to-not-die-banner"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                        {roleUser != ERoleType.UserSuperPremium && roleUser != ERoleType.UserPremium &&
                        <div className=" banner-block-shopee bg-color-shopee banner-shopee">
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 col-12 d-flex align-items-center">
                                    <div className="banner-content">
                                        <div className="tag-box">
                                            <h5 className="title">Siêu sale cuối tháng</h5>
                                            {!isBot && <a href="https://s.shopee.vn/8Uqmu0kzhT" className="text-box-shopee">
                                                Tham Gia Ngay
                                            </a>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-12 ">
                                    <Image
                                        src={VouncherBanner}
                                        className="dignole-img show-img"
                                        alt="shopee-banner"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}