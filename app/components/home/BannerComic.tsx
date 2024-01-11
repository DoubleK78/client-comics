import Image from "next/image";

export default function BannerComic() {
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
                                <div className="col-lg-5 col-sm-5 col-12 d-flex align-items-center">
                                    <div className="banner-content">
                                        <h2 className="title">ONE PIECE</h2>
                                        <p className="text">VOLUME 104</p>
                                        <p className="text">CHAPTER 1016</p>
                                        <div className="tag-box">
                                            <a href="manga-detail.html" className="text-box active">
                                                pg-13
                                            </a>
                                            <a href="manga-detail.html" className="text-box">
                                                dub
                                            </a>
                                            <a href="manga-detail.html" className="text-box">
                                                sub
                                            </a>
                                        </div>
                                        <p className="light-text">APRIL 07, 2023</p>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-sm-7 col-12 ">
                                    <img
                                        src="/assets/media/banner/banner-img-4.png"
                                        className="dignole-img show-img"
                                        alt=""
                                    />
                                    <img
                                        src="/assets/media/banner/banner-img-7.png"
                                        className="dignole-img hide-img"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="banner-block bg-color-black">
                            <div className="row">
                                <div className="col-lg-7 col-sm-7 col-12">
                                    <img
                                        src="/assets/media/banner/banner-img-5.png"
                                        className="dignole-img show-img"
                                        alt=""
                                    />
                                    <img
                                        src="/assets/media/banner/banner-img-8.png"
                                        className="dignole-img hide-img"
                                        alt=""
                                    />
                                </div>
                                <div className="col-lg-5 col-sm-5 col-12 d-flex align-items-center">
                                    <div className="banner-content text-end">
                                        <h2 className="title">THAT TIME I GOT A SLIME</h2>
                                        <p className="text">VOLUME 104</p>
                                        <p className="text pe-0">CHAPTER 1016</p>
                                        <div className="tag-box">
                                            <a
                                                href="manga-detail.html"
                                                className="text-box active ms-2"
                                            >
                                                pg-13
                                            </a>
                                            <a href="manga-detail.html" className="text-box">
                                                dub
                                            </a>
                                            <a href="manga-detail.html" className="text-box">
                                                sub
                                            </a>
                                        </div>
                                        <p className="light-text">APRIL 07, 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}