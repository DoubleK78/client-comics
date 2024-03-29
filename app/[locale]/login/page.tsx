import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';
import dynamic from "next/dynamic";
import { getTranslations } from 'next-intl/server';
import { pathnames } from "@/navigation";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/login"]['vi'];
    const routeEn = '/en' + pathnames["/login"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('login'),
        description: t('login_description')
    };
}

const DynamicLoginButton = dynamic(() => import("../../components/login/LoginButton"), {
    ssr: false
})

export default async function Login() {
    const t = await getTranslations('logins');
    const session = await getServerSession(authOptions);
    if (!!session) {
        return redirect('/');
    }

    return (
        <>
            {/*=====================================*/}
            {/*=        login Area Start          =*/}
            {/*=====================================*/}
            <section className="login text-center">
                <div className="container">
                    <div className="login-block">
                        <div className="login-content">
                            <h3>{t('login')}</h3>
                            <DynamicLoginButton />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}