'use client'

import { useTranslations } from 'next-intl';
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const t = useTranslations('error');

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <>
            <article style={{ textAlign: 'center', padding: '9vw' }}>
                <h1>{t('something_went_wrong')}</h1>
                <div>
                    <p>{t('something_went_wrong_action')} &nbsp;
                        <button className='anime-btn btn-dark border-change me-2 d-inline' onClick={() => reset()}>{t('try_again')}</button>
                    </p>
                    <br />
                    <p>{t('support')}<a style={{ color: 'var(--color-primary)' }} href="https://www.facebook.com/tonotdievietnam">&nbsp;{t('contact_us')}</a></p>
                    <p>&mdash; Fast Scans &mdash;</p>
                </div>
            </article>
        </>
    )
}