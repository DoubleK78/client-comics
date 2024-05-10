"use client"
import dayjs from "@/lib/dayjs/dayjs-custom";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export default function MaintenancePage({ locale }: { locale: any }) {
    const t = useTranslations('home');

    const estimateTimeByLocale = useCallback((date: string) => {
        if (locale === 'vi') {
            return dayjs.utc(date).format('DD-MM-YYYY HH:mm');
        }

        return dayjs.utc(date).subtract(7, 'hours').format('DD-MM-YYYY HH:mm') + " (UTC)";
    }, [locale]);

    return (
        <>
            <article style={{ textAlign: 'center', padding: '9vw'}}>
                <h1>{t('back_soon')}</h1>
                <div>
                    <p>{t('sorry')}<a style={{ color: 'var(--color-primary)' }} href="https://www.facebook.com/tonotdievietnam">{t('contact_us')}</a>, {t('dev')} !</p>
                    {process.env.maintenanceEstimateCompleted && <p>{t('estimate_completed')} {estimateTimeByLocale(process.env.maintenanceEstimateCompleted)}</p>}
                    <p>&mdash; Fast Scans Team &mdash;</p>
                </div>
            </article>
        </>
    );
}