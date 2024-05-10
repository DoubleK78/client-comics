import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { pathnames } from "@/navigation";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/upgrade-package"]['vi'];
    const routeEn = '/en' + pathnames["/upgrade-package"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('upgrade_account'),
        description: t('upgrade_account_description')
    };
}

const DynamicUpgradePackagePage = dynamic(() => import('@/app/components/upgrade-package/UpgradePackagePage'), {
    ssr: false
});

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/login');
    }
    return (
        <DynamicUpgradePackagePage session={session} />
    );
}