"use client"
import Image from "next/image";
import { useTranslations } from 'next-intl';
import ToNotDieBanner from '@/public/assets/media/banner/to_not_die.png';
import { handleRedirect } from "@/app/utils/HelperFunctions";

export default function BannerComic({ roleUser }: { roleUser: any }) {
    const t = useTranslations('home');
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
                                            <a onClick={()=>handleRedirect("/truyen-tranh/de-co-the-song-sot", roleUser)} className="text-box">
                                                {t('view_now')}
                                            </a>
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
                    </div>
                </div>
            </section>
        </>
    )
}