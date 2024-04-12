import Install from "@/app/components/Install/Install";
import { pathnames } from "@/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    const baseUrl = process.env.NEXT_BASE_URL!;

    const routeVi = pathnames["/install"]['vi'];
    const routeEn = '/en' + pathnames["/install"]['en'];

    return {
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: locale === 'vi' ? routeVi : routeEn,
            languages: {
                'vi': routeVi,
                'en': routeEn,
            },
        },
        title: t('install'),
        description: t('install_description')
    };
}

export default async function Page() {
    const t = await getTranslations('install');

    return (
        <div className="container-fluid">
            <article style={{ textAlign: 'center', padding: '5vw' }}>
                <h1>{t('title')}</h1>
                <h3>{t('description')}&nbsp;
                    {process.env.MOBILE_URL && (
                        <>
                            <a target="_blank" style={{ color: 'var(--color-primary)' }} href={process.env.MOBILE_URL}>{t('here')}</a>&nbsp;
                        </>
                    )}
                    <span>{t('description_extra')}</span>
                </h3>

                <h5 className="mt-5 s-glitter-text name-cmt">[{t('ios_user')}]</h5>
                <div className="row mt-3">
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/ios/ios_install_1.webp" alt="ios_install_1" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_ios_1')}</span></figcaption>
                    </figure>
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/ios/ios_install_2.webp" alt="ios_install_2" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_ios_2')}</span></figcaption>
                    </figure>
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/ios/ios_install_3.webp" alt="ios_install_3" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_ios_3')}</span></figcaption>
                    </figure>
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/ios/ios_install_4.webp" alt="ios_install_4" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_ios_4')}</span></figcaption>
                    </figure>
                </div>

                <h5 className="mt-3 s-glitter-text name-cmt">[{t('android_user')}]</h5>
                <div className="row mt-3">
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/android/android_install_1.webp" alt="android_install_1" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_android_1')}</span></figcaption>
                    </figure>
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/android/android_install_2.webp" alt="android_install_2" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_android_2')}</span></figcaption>
                    </figure>
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/android/android_install_3.webp" alt="android_install_3" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_android_3')}</span></figcaption>
                    </figure>
                    <figure className="col-md-3 figure">
                        <Image src="/assets/media/install/android/android_install_4.webp" alt="android_install_4" width={540} height={1170} />
                        <figcaption className="mt-2 figure-caption text-white"><span>{t('step_android_4')}</span></figcaption>
                    </figure>
                </div>
                <br />
                <Install />
                <div>
                    <p>{t('support')}<a style={{ color: 'var(--color-primary)' }} href="https://www.facebook.com/tonotdievietnam">&nbsp;{t('contact_us')}</a></p>
                    <p>&mdash; Fast Scans &mdash;</p>
                </div>
            </article>
        </div>
    );
} 