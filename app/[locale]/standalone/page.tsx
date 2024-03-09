import { getTranslations } from "next-intl/server";

export default async function Page() {
    const t = await getTranslations('header');

    return (
        <>
            <article style={{ textAlign: 'center', padding: '9vw' }}>
                <h1>{t('standalone_mobile')}</h1>
                <div>
                    <p>{t('standalone_mobile_description')}<a style={{ color: 'var(--color-primary)' }} href="/login">&nbsp;{t('standalone_mobile_here')}</a></p>
                    <br />
                    <p>{t('standalone_mobile_refer')} <a style={{ color: 'var(--color-primary)' }} href="/upgrade-package">{t('standalone_mobile_here')}</a></p>
                    <p>{t('standalone_mobile_support')}<a style={{ color: 'var(--color-primary)' }} href="https://www.facebook.com/tonotdievietnam">&nbsp;{t('standalone_mobile_contact_us')}</a></p>
                    <p>&mdash; Fast Scans &mdash;</p>
                </div>
            </article>
        </>
    )
}