import Image from "next/image";

export default function RecentlyUploadedComic() {
    return (
        <>
            {/*=====================================*/}
            {/*=        Popular Anime Area Start =*/}
            {/*=====================================*/}
            <section className="popular style-2  sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h2>Recently Uploaded</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-12 comic-element">
                            <div className="anime-blog">
                                <a href="manga-detail.html">
                                    <img src="/assets/media/manga/manga-img-9.png" alt="" />
                                </a>
                                <div className="d-flex justify-content-between">
                                    <p className="text">Chapter 179</p>
                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="dropdown-toggle"
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
                                                    <i className="fa fa-check" /> Watch Later{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="manga-detail.html">
                                                    <i className="fas fa-plus" /> Add to Playlist{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a href="manga-detail.html">
                                    <p>Bleach</p>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 comic-element">
                            <div className="anime-blog">
                                <a href="manga-detail.html">
                                    <img src="/assets/media/manga/manga-img-10.png" alt="" />
                                </a>
                                <div className="d-flex justify-content-between">
                                    <p className="text">Chapter 179</p>
                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="dropdown-toggle"
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
                                                    <i className="fa fa-check" /> Watch Later{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="manga-detail.html">
                                                    <i className="fas fa-plus" /> Add to Playlist{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a href="manga-detail.html">
                                    <p>Spy X Family</p>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 comic-element">
                            <div className="anime-blog">
                                <a href="manga-detail.html">
                                    <img src="/assets/media/manga/manga-img-11.png" alt="" />
                                </a>
                                <div className="d-flex justify-content-between">
                                    <p className="text">Chapter 179</p>
                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="dropdown-toggle"
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
                                                    <i className="fa fa-check" /> Watch Later{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="manga-detail.html">
                                                    <i className="fas fa-plus" /> Add to Playlist{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a href="manga-detail.html">
                                    <p>Naruto</p>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 comic-element">
                            <div className="anime-blog">
                                <a href="manga-detail.html">
                                    <img src="/assets/media/manga/manga-img-12.png" alt="" />
                                </a>
                                <div className="d-flex justify-content-between">
                                    <p className="text">Chapter 179</p>
                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="dropdown-toggle"
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
                                                    <i className="fa fa-check" /> Watch Later{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="manga-detail.html">
                                                    <i className="fas fa-plus" /> Add to Playlist{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a href="manga-detail.html">
                                    <p>Summer Time</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}