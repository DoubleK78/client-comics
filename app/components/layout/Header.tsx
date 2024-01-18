import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server';

const DynamicLogoutButton = dynamic(() => import('./LogoutButton'), {
    ssr: false
});

export default async function Header() {
    const session = await getServerSession(authOptions);
    const isLogined = !!session;

    const t = await getTranslations('header');

    return (
        <header className="header style-1">
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
                                    Ranking
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="ranking">
                                    <li>
                                        <a href="manga-detail.html" className="active">
                                            Top all
                                        </a>
                                    </li>
                                    <li>
                                        <a href="home-2.html">Top year</a>
                                    </li>
                                    <li>
                                        <a href="home-3.html">Top month</a>
                                    </li>
                                    <li>
                                        <a href="streaming-season.html">Top day</a>
                                    </li>
                                    <li>
                                        <a href="streaming-movie.html">Top follow</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="/search">Explore</a>
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
                                    Genre
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="types">
                                    <li>
                                        <a href="manga-detail.html" className="active">
                                            Manga
                                        </a>
                                    </li>
                                    <li>
                                        <a href="home-2.html">Manhwa</a>
                                    </li>
                                    <li>
                                        <a href="home-3.html">Manhua</a>
                                    </li>
                                    <li>
                                        <a href="streaming-season.html">Comic</a>
                                    </li>
                                    <li>
                                        <a href="streaming-movie.html">Bande Dessinée</a>
                                    </li>
                                </ul>
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
                                    placeholder="Search"
                                />
                            </div>
                        </form>
                        {!isLogined ? (
                            <div className="d-flex right-nav">
                                <a href="login" className="anime-btn btn-dark">
                                    LOG IN
                                </a>
                            </div>
                        ) : (
                            <div className="d-flex right-nav">
                                <img
                                    src={session.user?.image ?? ''}
                                    className="rounded-circle shadow-4 px-2"
                                    style={{ height: 55 }}
                                    alt="Avatar"
                                />
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