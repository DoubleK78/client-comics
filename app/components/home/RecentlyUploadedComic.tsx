"use client"
import { useTranslations } from 'next-intl';
import PagingRequest from "@/app/models/paging/PagingRequest";
import axiosClientApiInstance from "@/lib/services/client/interceptor";
import ServerResponse from "@/app/models/common/ServerResponse";
import { portalServer } from "@/lib/services/client/baseUrl";
import { useEffect, useState } from 'react';
const getAlbums = async (params: PagingRequest, filter: any) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>(portalServer + '/api/album', {
            params: { ...params, ...filter },
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};
export default function RecentlyUploadedComic() {
    const t = useTranslations('home');
    const [albums, setAlbums] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [pagingParams, setPagingParams] = useState<PagingRequest>({
        PageNumber: 1,
        PageSize: 12,
        SearchTerm: '',
        SortColumn: 'updatedOnUtc',
        SortDirection: 'desc'
    });

    useEffect(() => {
        getAlbums(pagingParams, null).then((response: any) => {
            if (response && response.data) {
                setAlbums(response.data);
                if (response.data != null)
                    setLoading(false)
            }
        });
    }, []);
    return (
        <>
            {/*=====================================*/}
            {/*=        Popular Anime Area Start =*/}
            {/*=====================================*/}
            <section className="popular style-2  sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h2> {t('recently_uploaded')}</h2>
                    </div>
                    {loading && (
                        // Display the spinner when loading is true
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    <div className="row">
                    {albums?.map((album: any) => (
                        <div key={album.id} className="col-lg-3 col-sm-6 col-12 comic-element">
                            <div className="anime-blog">
                                <a href={`truyen-tranh/${album.friendlyName}`}>
                                    <img src={album.cdnThumbnailUrl ?? "/assets/media/404/none.jpg"} alt={album.title} />
                                </a>
                                <div className="d-flex justify-content-between">
                                    <p className="text">{album?.contents[0]?.title}</p>
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
                                                <a href="#" className="none">
                                                    <i className="fa fa-check" /> Follow{" "}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a href={`truyen-tranh/${album.friendlyName}`}>
                                    <p>{album.title}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </>
    );
}