import dynamic from "next/dynamic";
import { getLocale, getTranslations } from "next-intl/server";
import { pathnames } from "@/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/schedule"]['vi'];
    const routeEn = '/en' + pathnames["/schedule"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('schedule'),
        description: t('schedule_description')
    };
}

const DynamicSchedulePage = dynamic(() => import('@/app/components/schedule/SchedulePage'), {
    ssr: false
});

export default async function Page() {
    const locale = await getLocale();
    const session = await getServerSession(authOptions);
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);

    if (!session) {
        return redirect('/login');
    }
    
    return (
        <DynamicSchedulePage locale={locale} roleUser={roleUser}/>
    );
}