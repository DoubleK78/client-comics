import dynamic from "next/dynamic";
import { getLocale, getTranslations } from "next-intl/server";
import { pathnames } from "@/navigation";
import { redirect } from "next/navigation";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/maintenance"]['vi'];
    const routeEn = '/en' + pathnames["/maintenance"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        robots: {
            index: false,
            follow: false,
        },
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('maintenance'),
        description: t('maintenance_desctipion')
    };
}

const DynamicMaintenancePage = dynamic(() => import('@/app/components/maintenance/MaintenancePage'), {
    ssr: false
});

export default async function Page() {
    if (!process.env.MAINTENANCE_MODE || process.env.MAINTENANCE_MODE?.toLowerCase() === 'false') {
        redirect('/');
    }

    const locale = await getLocale();

    return (
        <DynamicMaintenancePage locale={locale} />
    );
}