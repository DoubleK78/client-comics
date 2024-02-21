import ContentResponse from '@/app/models/contents/ContentResponse';
import ComicDetail from '@/app/models/comics/ComicDetail';
import dynamic from "next/dynamic";
import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';
import { getEnumValueFromString } from '@/app/utils/HelperFunctions';
import { ERoleType } from '@/app/models/enums/ERoleType';
import dayjs from "@/lib/dayjs/dayjs-custom";
import ContentComicItemV2 from './ContentComicItemV2';

const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
    ssr: false
});
export default async function ContentComic({ content, comic, session, locale }: { content?: ContentResponse | null, comic?: ComicDetail | null, session: any, locale: any }) {
    const t = useTranslations('comic_detail');
    let albumFriendlyName = content?.albumFriendlyName;
    let currentFriendlyName = content?.friendlyName;
    let prevChap, nextChap, isLastChap, isFirstChap;
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);

    if (currentFriendlyName !== null && currentFriendlyName !== undefined) {
        let currentChapNumber = parseInt(currentFriendlyName.split("-")[1]);
        let endChapNumber = parseInt((comic?.contents[0]?.friendlyName ?? "0").split("-")[1]);
        let startChapNumber = parseInt((comic?.contents[comic?.contents.length - 1]?.friendlyName ?? "0").split("-")[1]);
        prevChap = `/truyen-tranh/${albumFriendlyName}/${currentFriendlyName.replace(currentFriendlyName, 'chap-' + (currentChapNumber - 1) ?? '')}`;
        nextChap = `/truyen-tranh/${albumFriendlyName}/${currentFriendlyName.replace(currentFriendlyName, 'chap-' + (currentChapNumber + 1) ?? '')}`;
        isLastChap = parseInt(currentFriendlyName.split("-")[1]) < endChapNumber || false;
        isFirstChap = parseInt(currentFriendlyName.split("-")[1]) > startChapNumber || false;
    }

    return (
        <>
            {/*=====================================*/}
            {/*=        Chapter Area Start       	=*/}
            {/*=====================================*/}
            <section className="chapter sec-mar">
                <div className="container">
                    <div className="heading style-1">
                        <h1>{content?.albumTitle} - {content?.title}</h1>
                    </div>
                    <ScrollButton />
                    <div className="d-flex justify-content-between mb-4">
                        <div className="left">
                            <a
                                href="#"
                                className="anime-btn btn-dark border-change dropdown-toggle"
                                id="country"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                            >
                                {content?.title}
                                <span className='chevron-down'>
                                    <i className="fa fa-chevron-down" />
                                </span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="country">
                                <div className='chapter-list-content'>
                                    {comic?.contents?.map((content, index) => (
                                        <li key={index} className="grid-item">
                                            <a className='page-link' href={`/truyen-tranh/${content.albumFriendlyName}/${content.friendlyName}`}>
                                                {content.title}
                                            </a>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>
                        <div className="right">
                            {isFirstChap &&
                                <a href={prevChap} className="anime-btn btn-dark">
                                    {t('previous')}
                                </a>
                            }
                            {isLastChap &&
                                <a
                                    href={nextChap}
                                    className="anime-btn btn-dark border-change ms-1"
                                >
                                    {t('next')}
                                </a>
                            }
                        </div>
                    </div>
                    {(content && roleUser && roleUser >= content.levelPublic) || (content && content.levelPublic == 0) ?
                        (
                            <div className="row text-center pt-4">
                                {process.env.LAZY_LOADING_IMAGE == 'false' && content?.contentItems && content?.contentItems.map((item: any) => (
                                    <div key={uuidv4()} className="chapter-image col-lg-10 offset-lg-1 col-12 offset-0 img-chapter">
                                        <img 
                                            loading='lazy'
                                            src={item}
                                            alt=""
                                            width={800}
                                        />
                                    </div>
                                ))}
                                {process.env.LAZY_LOADING_IMAGE == 'true' && content?.contentItems && content?.contentItems.map((item: any) => (
                                    <ContentComicItemV2 key={uuidv4()} imageUrl={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="row text-center pt-4" style={{color: 'white'}}>
                                <h1>{t('priority')}</h1>
                                {roleUser === ERoleType.UserPremium &&
                                    <h3>{t('will_publish_pre')} {locale == 'vi' ? (
                                        <>
                                            <span>{dayjs.utc(content?.createdOnUtc).local().add(4, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{dayjs.utc(content?.createdOnUtc).add(4, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    )}</h3>
                                }
                                {roleUser === ERoleType.User &&
                                    <h3>{t('will_publish')} {locale == 'vi' ? (
                                        <>
                                            <span>{dayjs.utc(content?.createdOnUtc).local().add(12, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{dayjs.utc(content?.createdOnUtc).add(12, 'hours').format('HH:mm A DD-MM-YYYY')}</span>
                                        </>
                                    )}</h3>
                                }
                                <p>{t('refer')} <a style={{color: 'var(--color-primary)'}} href="/upgrade-package">{t('here')}</a></p>
                            </div>
                        )}
                    <br></br>

                    {((content && roleUser && roleUser >= content.levelPublic) || (content && content.levelPublic == 0)) &&
                        <div className="d-flex justify-content-between mb-4">
                            <div className="left">
                                <a
                                    href="#"
                                    className="anime-btn btn-dark border-change dropdown-toggle"
                                    id="country"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {content?.title}
                                    <span className='chevron-down'>
                                        <i className="fa fa-chevron-down" />
                                    </span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="country">
                                    <div className='chapter-list-content'>
                                        {comic?.contents?.map((content, index) => (
                                            <li key={index} className="grid-item">
                                                <a className='page-link' href={`/truyen-tranh/${content.albumFriendlyName}/${content.friendlyName}`}>
                                                    {content.title}
                                                </a>
                                            </li>
                                        ))}
                                    </div>
                                </ul>
                            </div>
                            <div className="right">
                                {isFirstChap &&
                                    <a href={prevChap} className="anime-btn btn-dark">
                                        {t('previous')}
                                    </a>
                                }
                                {isLastChap &&
                                    <a
                                        href={nextChap + "?previousCollectionId=" + content?.id}
                                        className="anime-btn btn-dark border-change ms-1"
                                    >
                                        {t('next')}
                                    </a>
                                }
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    );
}