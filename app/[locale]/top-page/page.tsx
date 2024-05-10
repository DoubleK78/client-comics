import { getLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { pathnames } from "@/navigation";

type Props = {
    params: { locale: string },
    searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params: { locale }, searchParams }: Props) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/top-page"]['vi'];
    const routeEn = '/en' + pathnames["/top-page"]['en'];

    let title = t('top_popular');
    if (searchParams?.typePage) {
        switch (searchParams.typePage) {
            case 'day':
                title = t('top_day');
                break;
            case 'week':
                title = t('top_week');
                break;
            case 'month':
                title = t('top_month');
                break;
            case 'year':
                title = t('top_year');
                break;
            case 'manga':
                title = t('top_manga');
                break;
            case 'manhwa':
                title = t('top_manhwa');
                break;
            case 'manhua':
                title = t('top_manhua');
                break;
            case 'comic':
                title = t('top_comic');
                break;
            case 'bande_dessinée':
                title = t('top_bande_dessinee');
                break;
            default:
                title = t('top_popular');
                break;
        }
    }
    else if (searchParams?.sort === 'updateDate') {
        title = t('top_recently_updated');
    }

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('top', { title }),
        description: t('top_description')
    };
}

const DynamicTopPage = dynamic(() => import('@/app/components/top-page/TopPage'), {
    ssr: false
});

const ScrollButton = dynamic(() => import('@/app/components/common/ScrollButton'), {
    ssr: false
});

export default async function Page() {
    const session = await getServerSession(authOptions);
    const locale = await getLocale();
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);
    return (
        <>
            <ScrollButton />
            <DynamicTopPage locale={locale} roleUser={roleUser} />
        </>
    );
}