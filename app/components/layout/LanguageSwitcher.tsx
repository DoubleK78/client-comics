"use client";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher({ locale }: { locale: string }) {
    const pathName = usePathname();
    const t = useTranslations('header');

    return (
        <>
            <a
                className="dropdown-toggle hover"
                id="types"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
            >
                {locale === 'vi' ? <span className="flag-icon flag-icon-vn flag-icon-squared"></span> : <span className="flag-icon flag-icon-gb-eng flag-icon-squared"></span>}
            </a>
            <ul className="dropdown-menu" aria-labelledby="types">
                <li>
                    <Link locale="vi" href={pathName} className={locale === 'vi' ? 'active' : ''}>
                        <span className="flag-icon flag-icon-vn flag-icon-squared"></span> {t('vietnamese')}
                    </Link>
                </li>
                <li>
                    <Link locale="en" href={pathName} className={locale === 'en' ? 'active' : ''}>
                        <span className="flag-icon flag-icon-gb-eng flag-icon-squared"></span> {t('english')}
                    </Link>
                </li>
            </ul>
        </>
    );
}
