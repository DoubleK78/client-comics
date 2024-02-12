import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('detail_package'),
        description: t('detail_package_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
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