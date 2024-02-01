import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getTranslations } from 'next-intl/server';

export default async function Page() {
    const t = await getTranslations('profile');
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/login');
    }

    return (
        <>
            {/*=====================================*/}
            {/*=      Breadcrumb Area Start        =*/}
            {/*=====================================*/}
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li>
                                <a className="active">{t('profile')}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            {/*=====================================*/}
            {/*=      Profile Area Start        =*/}
            {/*=====================================*/}
            <section className="profile sec-mar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-sm-12 col-12">
                            <div className="row pb-5">
                                <div className="col-lg-4 col-sm-6 col-12">
                                    <div className="img-box">
                                        <img src={session.user?.image ?? ''} alt="Avatar" className="rounded-circle shadow-4 px-2" />
                                    </div>
                                </div>
                                <div className="profile-seting col-lg-8 col-sm-6 col-12">
                                    <h5>{session.user?.name}</h5>
                                    <p>{session.user?.email?.split('@')[0]}</p>
                                    <p className="pb-3">{session.user?.email}</p>
                                    <p className="user-level">{t('level')}: Base</p>
                                    <div className="progress-container">
                                        <div className="progress-bar progress-bar-rgb-s-premium" style={{ width: '78%' }}>
                                            78%
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="anime-btn btn-dark border-change"
                                    >
                                        {t('upgrade_account')}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-12">
                        <div className="profile-link bg-color-black">
                            <a data-hover-text="Hello" className="user-level">
                                <p className="user-level">{t('level_list')}</p>
                                <div className="hover-text level-step">Base
                                    <hr /> SSJ1
                                    <hr /> SSJ2
                                    <hr /> SSJ3
                                    <hr /> GOD
                                    <hr /> BLUE
                                    <hr /> UI
                                    <hr /> MUI
                                </div>
                            </a>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-0 col-sm-8 offset-sm-2 col-12">
                            <div className="profile-link bg-color-black">
                                <h5>{t('shortcut')}</h5>
                                <a href="#">{t('read_history')}</a>
                                <a href="#">{t('following')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}