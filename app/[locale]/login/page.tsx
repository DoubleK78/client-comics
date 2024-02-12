import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';
import dynamic from "next/dynamic";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('login'),
        description: t('login_description'),
        icons: {
            icon: '/assets/media/icon/head.ico',
        }
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