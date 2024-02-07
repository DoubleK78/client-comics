"use client"
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function DetailPackagePage() {
    const t = useTranslations('upgrade');
    const typePage = typeof window !== 'undefined' ? new URLSearchParams(window.location.search)?.get('package') || "" : "";
    useEffect(() => {

    }, []);
    return (
        <section className="blog style-1 sec-mar">
            <div className="container">

                {(typePage == 'premium' || typePage == '') ?
                    (
                        <>
                            <div className="heading style-1">
                                <h2 className="glitter-text" style={{height: '50px'}}>{t('upgrade_package')} Premium</h2>
                            </div>
                            <div className="another-package">
                                <a
                                    href="/detail-package?package=spremium"
                                    className="anime-btn btn-dark border-change ms-1"
                                >
                                    {t('another_package')}
                                </a>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                                    <a href="#" className="inner-box">
                                        <div className="image-box">
                                            <img src="/assets/media/banner/premium.jpg" alt="" className="attachment-full size-full" />
                                        </div>
                                        <div className="author-box text-start">
                                            <div className="detail d-flex align-items-center justify-content-between">
                                                <p className="glitter-text">19.000 {t('money')}</p>
                                                <p className="glitter-text">30 {t('days')}</p>
                                            </div>
                                            <h4 className="glitter-text">{t('premium')} 1</h4>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/media/comment/comment-img.png" className="w-auto" alt="" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                                    <a href="#" className="inner-box">
                                        <div className="image-box">
                                            <img src="/assets/media/banner/premium.jpg" alt="" className="attachment-full size-full" />
                                        </div>
                                        <div className="author-box text-start">
                                            <div className="detail d-flex align-items-center justify-content-between">
                                                <p className="glitter-text">49.000 {t('money')}</p>
                                                <p className="glitter-text">90 {t('days')}</p>
                                            </div>
                                            <h4 className="glitter-text">{t('premium')} 2</h4>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/media/comment/comment-img-4.png" className="w-auto" alt="" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                                    <a href="#" className="inner-box">
                                        <div className="image-box">
                                            <img src="/assets/media/banner/premium.jpg" alt="" className="attachment-full size-full" />
                                        </div>
                                        <div className="author-box text-start">
                                            <div className="detail d-flex align-items-center justify-content-between">
                                                <p className="glitter-text">199.000 {t('money')}</p>
                                                <p className="glitter-text">365 {t('days')}</p>
                                            </div>
                                            <h4 className="glitter-text">{t('premium')} 3</h4>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/media/comment/comment-img-4.png" className="w-auto" alt="" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <br></br>
                            <div className="comment-block">
                                <div className="heading style-1 m-0">
                                    <h2 className="glitter-text">{t('benefits')}</h2>
                                </div>
                                <br></br>
                                <p className="glitter-text">
                                    - {t('benefit_10')}
                                </p>
                                <br />
                                <p className="glitter-text">
                                    - {t('benefit_2')}
                                </p>
                                <br />
                                <p className="glitter-text">
                                    - {t('benefit_11')}
                                </p>
                                <br />
                                <p className="glitter-text">
                                    - {t('benefit_12')}
                                </p>
                                <br />
                                <p className="glitter-text">
                                    - {t('benefit_13')}
                                </p>
                                <br />
                                <p className="glitter-text">
                                    - {t('benefit_14')}
                                </p>
                                <br />
                                <p className="glitter-text">
                                    - {t('benefit_15')}
                                </p>
                                <br />
                                <p className="glitter-text">
                                    - {t('benefit_9')}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="heading style-1">
                                <h2 className="s-glitter-text" style={{height: '50px'}}>{t('upgrade_package')} S-Premium</h2>
                            </div>
                            <div className="another-package">
                                <a
                                    href="/detail-package?package=premium"
                                    className="anime-btn btn-dark border-change ms-1"
                                >
                                    {t('another_package')}
                                </a>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                                    <a href="#" className="inner-box">
                                        <div className="image-box">
                                            <img src="/assets/media/banner/s-premium.jpg" alt="" className="attachment-full size-full" />
                                        </div>
                                        <div className="author-box text-start">
                                            <div className="detail d-flex align-items-center justify-content-between">
                                                <p className="s-glitter-text">49.000 {t('money')}</p>
                                                <p className="s-glitter-text">30 {t('days')}</p>
                                            </div>
                                            <h4 className="s-glitter-text">{t('s-premium')} 1</h4>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/media/comment/comment-img.png" className="w-auto" alt="" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                                    <a href="#" className="inner-box">
                                        <div className="image-box">
                                            <img src="/assets/media/banner/s-premium.jpg" alt="" className="attachment-full size-full" />
                                        </div>
                                        <div className="author-box text-start">
                                            <div className="detail d-flex align-items-center justify-content-between">
                                                <p className="s-glitter-text">139.000 {t('money')}</p>
                                                <p className="s-glitter-text">90 {t('days')}</p>
                                            </div>
                                            <h4 className="s-glitter-text">{t('s-premium')} 2</h4>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/media/comment/comment-img-4.png" className="w-auto" alt="" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                                    <a href="#" className="inner-box">
                                        <div className="image-box">
                                            <img src="/assets/media/banner/s-premium.jpg" alt="" className="attachment-full size-full" />
                                        </div>
                                        <div className="author-box text-start">
                                            <div className="detail d-flex align-items-center justify-content-between">
                                                <p className="s-glitter-text">499.000 {t('money')}</p>
                                                <p className="s-glitter-text">365 {t('days')}</p>
                                            </div>
                                            <h4 className="s-glitter-text">{t('s-premium')} 3</h4>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/media/comment/comment-img-4.png" className="w-auto" alt="" />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <br></br>
                            <div className="comment-block">
                                <div className="heading style-1 m-0">
                                    <h2 className="s-glitter-text">{t('benefits')}</h2>
                                </div>
                                <br></br>
                                <p className="s-glitter-text">
                                    - {t('benefit_1')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_2')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_3')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_4')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_5')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_6')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_7')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_8')}
                                </p>
                                <br />
                                <p className="s-glitter-text">
                                    - {t('benefit_9')}
                                </p>
                            </div>
                        </>
                    )
                }
            </div>
        </section>
    );
}