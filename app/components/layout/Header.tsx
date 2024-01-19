import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic'
import { getTranslations, getLocale } from 'next-intl/server';
import Initial from "./Initial";

const DynamicLogoutButton = dynamic(() => import('./LogoutButton'), {
    ssr: false
});

const DynamicLanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), {
    ssr: false
})

export default async function Header() {
    const session = await getServerSession(authOptions);
    const isLogined = !!session;

    const t = await getTranslations('header');
    const locale = await getLocale();

    return (
        <header className="header style-1">
            <Initial props={session} />
            <div className="container">
                {/* Start Mainmanu Nav */}
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="/">
                        <img src="/assets/media/logo.png" alt="" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mynavbar"
                    >
                        <i className="fas fa-bars" />
                    </button>
                    <div className="collapsed navbar-collapse collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto mainmenu">
                            <li className="menu-item-has-children">
                                <a href="home.html">{t('following')}</a>
                            </li>
                            <li className="menu-item-has-children">
                                <a
                                    href="#"
                                    className="dropdown-toggle"
                                    id="ranking"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {t('ranking')}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="ranking">
                                    <li>
                                        <a href="manga-detail.html" className="active">
                                            {t('top_all')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="home-2.html">{t('top_year')}</a>
                                    </li>
                                    <li>
                                        <a href="home-3.html">{t('top_month')}</a>
                                    </li>
                                    <li>
                                        <a href="streaming-season.html">{t('top_day')}</a>
                                    </li>
                                    <li>
                                        <a href="streaming-movie.html">{t('top_follow')}</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="/search">{t('explore')}</a>
                            </li>
                            <li className="menu-item-has-children">
                                <a
                                    href="#"
                                    className="dropdown-toggle"
                                    id="types"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {t('genre')}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="types">
                                    <li>
                                        <a href="manga-detail.html" className="active">
                                            {t('manga')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="home-2.html">{t('manhwa')}</a>
                                    </li>
                                    <li>
                                        <a href="home-3.html">{t('manhua')}</a>
                                    </li>
                                    <li>
                                        <a href="streaming-season.html">{t('comic')}</a>
                                    </li>
                                    <li>
                                        <a href="streaming-movie.html">{t('bande_dessinée')}</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <DynamicLanguageSwitcher locale={locale} />
                            </li>
                        </ul>
                        <form action="list-view.html">
                            <div className="input-group form-group header-search-box">
                                <button className="input-group-text anime-btn" type="submit">
                                    <i className="fal fa-search" />
                                </button>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="query"
                                    required={true}
                                    placeholder={t('search')}
                                />
                            </div>
                        </form>
                        {!isLogined ? (
                            <div className="d-flex right-nav">
                                <a href="login" className="anime-btn btn-dark">
                                    {t('login')}
                                </a>
                            </div>
                        ) : (
                            <div className="d-flex right-nav">
                                <a href="/profile" className="anime-btn btn-dark border-change me-2 text-avt">
                                    {session.user?.name}
                                </a>
                                <DynamicLogoutButton />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}