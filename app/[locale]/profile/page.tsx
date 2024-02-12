import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import { getEnumValueFromString, getLevelNameById, getProgressBar, getRoleBadge, getUserNameClass } from "@/app/utils/HelperFunctions";
import { getProfile } from "@/lib/services/server/users";
import { getPercentByDivdeTwoNumber } from "@/lib/math/mathHelper";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('profile'),
        description: t('profile_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
    };
}

export default async function Page() {
    const t = await getTranslations('profile');
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/login');
    }
    const roleUser = getEnumValueFromString((session.user?.token?.roles ? session.user.token.roles : []).join(','));
    const userProfile = await getProfile(session.user?.token?.apiToken);

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
                                    <div className="user-name-profile">
                                        <h5 className={getUserNameClass(roleUser)}>{session.user?.name}
                                        </h5>
                                        <div className="profile-tag">
                                            {getRoleBadge(roleUser)}
                                        </div>
                                    </div>
                                    <br />
                                    <p className={getUserNameClass(roleUser)}>{session.user?.email?.split('@')[0]}</p>
                                    <p className={"pb-3 " + getUserNameClass(roleUser)}>{session.user?.email}</p>
                                    <br />
                                    <p className={"user-level " + getUserNameClass(roleUser)}>{t('level')}: {getLevelNameById(userProfile?.levelId)}</p>
                                    <div className="progress-container">
                                        {getProgressBar(roleUser, getPercentByDivdeTwoNumber(userProfile?.currentExp, userProfile?.nextLevelExp))}
                                    </div>
                                    <a
                                        href="/upgrade-package"
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
                                <a href="/following">{t('read_history')}</a>
                                <a href="/following">{t('following')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}