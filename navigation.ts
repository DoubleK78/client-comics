import {
    createLocalizedPathnamesNavigation
} from 'next-intl/navigation';

export const locales = ['vi', 'en'] as const;
export const localePrefix = 'as-needed';

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
    // If all locales use the same pathname, a
    // single external path can be provided.
    '/comics': {
        en: '/comics',
        vi: '/truyen-tranh'
    },
    '/comics/[comicid]': {
        en: '/comics/[comicid]',
        vi: '/truyen-tranh/[comicid]'
    },
    '/comics/[comicid]/[contentid]': {
        en: '/comics/[comicid]/[contentid]',
        vi: '/truyen-tranh/[comicid]/[contentid]'
    },
    '/search': {
        en: '/search',
        vi: '/tim-kiem'
    },
    '/login': {
        en: '/login',
        vi: '/dang-nhap'
    },
    '/top-page': {
        en: '/top-page',
        vi: '/xep-hang'
    },
    '/following': {
        en: '/following',
        vi: '/theo-doi'
    },
    '/upgrade-package': {
        en: '/upgrade-package',
        vi: '/nang-cap-goi'
    },
    '/detail-package': {
        en: '/detail-package',
        vi: '/chi-tiet-goi'
    }
    ,
    '/payment': {
        en: '/payment',
        vi: '/thanh-toan'
    },
    '/profile': {
        en: '/profile',
        vi: '/profile'
    },
    '/top-user': {
        en: '/top-user',
        vi: '/top-user'
    },
    '/schedule': {
        en: '/schedule',
        vi: '/lich-ra-mat'
    },
    '/maintenance': {
        en: '/maintenance',
        vi: '/bao-tri'
    },
    '/install': {
        en: '/install',
        vi: '/cai-dat'
    }
}

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createLocalizedPathnamesNavigation({
        locales,
        localePrefix,
        pathnames: pathnames as typeof pathnames & Record<string & {}, string>
    });