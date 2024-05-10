import { pathnames } from "@/navigation";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

const DynamicTopUserPage = dynamic(() => import('@/app/components/top-user/TopUserPage'), {
    ssr: false
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/top-user"]['vi'];
    const routeEn = '/en' + pathnames["/top-user"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('top_user'),
        description: t('top_user_description')
    };
}

export default async function Page() {
    return (
        <DynamicTopUserPage />
    );
}