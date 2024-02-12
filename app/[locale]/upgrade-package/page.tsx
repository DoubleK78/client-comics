import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('upgrade_account'),
        description: t('upgrade_account_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
    };
}

const DynamicUpgradePackagePage = dynamic(() => import('@/app/components/upgrade-package/UpgradePackagePage'), {
    ssr: false
});

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <DynamicUpgradePackagePage session={session} />
    );
}