import ComicDetail, { EAlbumStatus } from "@/app/models/comics/ComicDetail";
import { useTranslations } from 'next-intl';

export default function InfomationComic({ comic }: { comic?: ComicDetail | null }) {
    const t = useTranslations('comic_detail');
    return (
        <>
            {/*=====================================*/}
            {/*=         video Area Start          =*/}
            {/*=====================================*/}
            <section className="video sec-mar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-12">
                            <div className="row">
                                <div className="col-lg-6 col-md-7 col-12">
                                    <div className="trailer-box">
                                        <img
                                            src={comic?.thumbnailUrl ?? "/assets/media/manga/manga-img-1.png"}
                                            alt=""
                                            className="image"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-5 col-12">
                                    <div className="trailer-content">
                                        <h2>{comic?.title}</h2>
                                        <p className="light-text">{comic?.contents[0]?.title}</p>
                                        <div className="dropdown">
                                            <button
                                                type="button"
                                                className="dropdown-toggle mx-2"
                                                data-bs-toggle="dropdown"
                                            >
                                                <svg
                                                    width={32}
                                                    height={22}
                                                    viewBox="0 0 32 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="0.145264"
                                                        y="0.00012207"
                                                        width="21.4395"
                                                        height="2.68125"
                                                        rx="1.34062"
                                                        fill="#999999"
                                                    />
                                                    <rect
                                                        x="0.145264"
                                                        y="7.41272"
                                                        width="21.4395"
                                                        height="2.68125"
                                                        rx="1.34062"
                                                        fill="#999999"
                                                    />
                                                    <rect
                                                        x="0.145264"
                                                        y="14.8258"
                                                        width="16.4914"
                                                        height="2.68125"
                                                        rx="1.34062"
                                                        fill="#999999"
                                                    />
                                                    <path
                                                        d="M19.8784 16.0712C19.8784 15.4163 20.4093 14.8854 21.0642 14.8854H30.2463C30.9011 14.8854 31.432 15.4163 31.432 16.0712C31.432 16.7261 30.9011 17.257 30.2463 17.257H21.0642C20.4093 17.257 19.8784 16.7261 19.8784 16.0712Z"
                                                        fill="#999999"
                                                    />
                                                    <path
                                                        d="M25.6552 22.0001C25.0171 22.0001 24.4999 21.4828 24.4999 20.8447V11.2977C24.4999 10.6596 25.0171 10.1423 25.6552 10.1423C26.2933 10.1423 26.8106 10.6596 26.8106 11.2977V20.8447C26.8106 21.4828 26.2933 22.0001 25.6552 22.0001Z"
                                                        fill="#999999"
                                                    />
                                                </svg>
                                            </button>
                                            <ul className="dropdown-menu bg-color-black pt-3 pb-3 ps-3 pe-3">
                                                <li>
                                                    <a href="manga-detail.html" className="none">
                                                        <i className="fa fa-check" /> {t('follow')}{" "}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="manga-detail.html">
                                                        <i className="fas fa-heart" /> {t('love')}{" "}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <h3>{t('description')}</h3>
                                        <p>
                                            {comic?.description}
                                        </p>
                                        <div className="d-flex pt-4">
                                            <a
                                                href={`/truyen-tranh/${comic?.friendlyName}/${comic?.contents[comic?.contents.length - 1]?.friendlyName}`}
                                                className="anime-btn btn-dark border-change me-3"
                                            >
                                                {t('read_first_chapter')}
                                            </a>
                                            <a href={`/truyen-tranh/${comic?.friendlyName}/${comic?.contents[0]?.friendlyName}`}
                                                className="anime-btn btn-dark">
                                                {t('read_last_chapter')}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                            <div className="trailer-content">
                                <h3>{t('information')}</h3>
                                <p>
                                    <span>{t('author')}:</span> <b>{comic?.authorNames}</b>
                                </p>
                                <p>
                                    <span>{t('artist')}:</span> <b>Bones</b>
                                </p>
                                <p>
                                    <span>{t('year')}: </span> {comic?.releaseYear}
                                </p>
                                <p>
                                    <span>{t('status')}:</span> <b>{comic?.albumStatus == EAlbumStatus.Ongoing ? 'Đang tiến hành' : 'Đã hoàn thành'}</b>
                                </p>
                                <p>
                                    <span>{t('type')}:</span> {comic?.contentTypeNames}
                                </p>
                                <p>
                                    <span>{t('nation')}:</span> {comic?.tags} <b>Hàn</b>
                                </p>
                                {/* <p>
                                    <span>Scores:</span> 2.53 by 4,405 reviews
                                </p> */}
                                <p>
                                    <span>{t('views')}:</span> {comic?.views.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}