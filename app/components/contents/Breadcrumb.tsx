import ContentResponse from "@/app/models/contents/ContentResponse";
import { useTranslations } from 'next-intl';

export default function Breadcrumb({ content }: { content?: ContentResponse | null }) {
    const t = useTranslations('comic_detail');
    return (
        <>
            {/*=====================================*/}
            {/*=      Breadcrumb Area Start        =*/}
            {/*=====================================*/}
            <section className="breadcrumb ">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li>
                                <a href="/">
                                    {t('home_page')}
                                </a>
                            </li>
                            <li>
                                <a href="/search">{t('explore')}</a>
                            </li>
                            <li>
                                <a href={`/comics/${content?.albumFriendlyName}`}>{content?.albumTitle}</a>
                            </li>
                            <li>
                                <a className="active">{content?.title}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}