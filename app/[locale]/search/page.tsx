import Search from "@/app/components/search/Search";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('search'),
        description: t('search_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
    };
}

export default async function Page() {
    const t = await getTranslations('search');
    const locale = await getLocale();
    return (
        <>
            {/* <!--=====================================-->
            <!--=      Breadcrumb Area Start        =-->
            <!--=====================================--> */}
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a className="active">{t('search_list')}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <Search locale={locale} />
        </>
    );
}