import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { pathnames } from "@/navigation";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/detail-package"]['vi'];
    const routeEn = '/en' + pathnames["/detail-package"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('detail_package'),
        description: t('detail_package_description')
    };
}

const DynamicDetailPackagePage = dynamic(() => import('@/app/components/detail-package/DetailPackagePage'), {
    ssr: false
});

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/login');
    }
    return (
        <DynamicDetailPackagePage />
    );
}