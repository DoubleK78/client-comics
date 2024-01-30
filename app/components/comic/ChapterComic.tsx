import ContentResponse from "@/app/models/contents/ContentResponse";
import dayjs from "@/lib/dayjs/dayjs-custom";
import { useTranslations } from 'next-intl';

export default function ChapterComic({ contents }: { contents?: ContentResponse[] | null }) {
    const t = useTranslations('comic_detail');
    return (
        <>
            {/*=====================================*/}
            {/*=         Release Area Start         =*/}
            {/*=====================================*/}
            <section className="relese sec-mar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <h3 className="small-title">{t('chapter_list')}</h3>
                            <div className=" chapter-list-container">
                                {contents?.map((content, index) => (
                                    <div key={index}>
                                        <h5 className="chapter-list">
                                            <a href={`/truyen-tranh/${content.albumFriendlyName}/${content.friendlyName}`}>{content.title}</a>
                                            <span>{dayjs.utc(content.createdOnUtc).local().format('DD-MM-YYYY HH:mm')}</span>
                                            <p><i className="fas fa-eye"></i> {content.views.toLocaleString()}</p>
                                        </h5>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8 offset-lg-0 offset-md-3 offset-sm-2 mt-lg-0 mt-3">
                            <h3 className="small-title">{t('similar')}</h3>
                            <div className="anime-box bg-color-black">
                                <a href="streaming-season.html">
                                    <div className="row m-0">
                                        <div className="p-0 col-2">
                                            <img src="/assets/media/anime-sm-img/anime-img-7.png" alt="" />
                                        </div>
                                        <div className="p-0 col-9">
                                            <div className="anime-blog">
                                                <p>86</p>
                                                <p className="text-box">dub 8</p>
                                                <p className="text-box">sub 12</p>
                                            </div>
                                        </div>
                                        <div className="p-0 col-1 show-type">
                                            <span className="show-type">TV</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}