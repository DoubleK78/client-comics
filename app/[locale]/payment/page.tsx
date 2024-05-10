import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { pathnames } from "@/navigation";

const DynamicPayment= dynamic(() => import('@/app/components/payment/Payment'), {
    ssr: false
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/payment"]['vi'];
    const routeEn = '/en' + pathnames["/payment"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('payment'),
        description: t('payment_description')
    };
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user.email;
    if (!session) {
        return redirect('/login');
    }
    return (
        <DynamicPayment userEmail={userEmail}/>
    );
}