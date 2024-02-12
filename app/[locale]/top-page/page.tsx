import { getLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('top'),
        description: t('top_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
    };
}

const DynamicTopPage = dynamic(() => import('@/app/components/top-page/TopPage'), {
    ssr: false
});

export default async function Page() {
    const locale = await getLocale();
    return (
        <DynamicTopPage locale={locale} />
    );
}