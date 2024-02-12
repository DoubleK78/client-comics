import Search from "@/app/components/search/Search";
import { getLocale, getTranslations } from "next-intl/server";

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
            <Search locale={locale}/>
        </>
    );
}