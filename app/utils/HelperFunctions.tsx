// helperFunctions.tsx

import React from 'react';
import { ERoleType, roleTypeEnumMapping } from '../models/enums/ERoleType';
import FollowingRequestModel from '../models/comics/FollowingRequestModel';
import axiosClientApiInstance from '@/lib/services/client/interceptor';
import ServerResponse from '../models/common/ServerResponse';
import { ELevel, levelEnumMapping } from '../models/enums/ELevel';
import { TypeCountry } from '../models/comics/TypeCountry';
import axios from 'axios';
import { ERegion } from '../models/comics/ComicSitemap';
import { EStorageType } from '../models/enums/EStorageType';
import { parseJsonFromString } from '@/lib/json';
import dayjs from '@/lib/dayjs/dayjs-custom';
import { productList } from './ProductUtils';
import Product from '../models/common/Product';

export const getHoverText = (roleType: any): string => {
    if (roleType === ERoleType.UserSuperPremium) return "78%";
    if (roleType === ERoleType.UserPremium) return "75%";
    if (roleType === ERoleType.User) return "70%";
    return "";
};

export const getUserClass = (roleType: any): string => {
    if (roleType === ERoleType.UserSuperPremium) return "user-level-s-premium";
    if (roleType === ERoleType.UserPremium) return "user-level-premium";
    if (roleType === ERoleType.User) return "user-level";
    return "";
};

export const getLevelBadgeClass = (roleType: any): string => {
    if (roleType === ERoleType.UserSuperPremium) return "level-badge-s-premium";
    if (roleType === ERoleType.UserPremium) return "level-badge-premium";
    if (roleType === ERoleType.User) return "level-badge";
    return "";
};

export const getRoleBadge = (roleType: any): React.ReactNode => {
    if (roleType === ERoleType.UserSuperPremium) return <span className="s-premium-badge">[S]Premium</span>;
    if (roleType === ERoleType.UserPremium) return <span className="premium-badge">Premium</span>;
    return null;
};

export const getProgressBar = (roleType: any, percent: any): React.ReactNode => {
    if (roleType === ERoleType.UserSuperPremium)
        return (<div className="progress-bar progress-bar-rgb-s-premium" style={{ width: `${percent}%` }}>
            {percent} %
        </div>);

    if (roleType === ERoleType.UserPremium)
        return (<div className="progress-bar progress-bar-rgb-premium" style={{ width: `${percent}%` }}>
            {percent} %
        </div>);

    if (roleType === ERoleType.User)
        return (<div className="progress-bar progress-bar-rgb" style={{ width: `${percent}%` }}>
            {percent} %
        </div>);
    return null;
};

export const getUserNameClass = (roleType: any): string => {
    if (roleType === ERoleType.UserSuperPremium) return "s-glitter-text name-cmt";
    if (roleType === ERoleType.UserPremium) return "glitter-text name-cmt";
    return "";
};

export const getHoverTextValue = (roleType: any): string => {
    if (roleType === ERoleType.UserSuperPremium) return "78%";
    if (roleType === ERoleType.UserPremium) return "75%";
    if (roleType === ERoleType.User) return "70%";
    return "";
};

export const getEnumValueFromString = (roles?: string[] | null): ERoleType => {
    try {
        if (!roles || roles.length === 0) {
            return ERoleType.NoneRole;
        }

        if (roles.some(r => r === roleTypeEnumMapping[ERoleType.Administrator])) {
            return ERoleType.Administrator;
        } else if (roles.some(r => r === roleTypeEnumMapping[ERoleType.Partner])) {
            return ERoleType.Partner;
        } else if (roles.some(r => r === roleTypeEnumMapping[ERoleType.UserSuperPremium])) {
            return ERoleType.UserSuperPremium;
        } else if (roles.some(r => r === roleTypeEnumMapping[ERoleType.UserPremium])) {
            return ERoleType.UserPremium;
        } else if (roles.some(r => r === roleTypeEnumMapping[ERoleType.User])) {
            return ERoleType.User;
        }
    }
    catch (exception) {
        return ERoleType.User;
    }

    // As default user doesn't have role, default to user
    return ERoleType.User;
}

export const followAlbum = async (requestModel: FollowingRequestModel) => {
    try {
        const response = await axiosClientApiInstance.post<ServerResponse<any>>('/api/following', requestModel);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getStatusFollow = async (requestModel: FollowingRequestModel) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>('/api/following', {
            params: requestModel,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};

export const unFollow = async (requestModel: FollowingRequestModel) => {
    try {
        const response = await axiosClientApiInstance.delete<ServerResponse<any>>('/api/following', {
            params: requestModel,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};

export const getLevelNameById = (levelId?: number | null) => {
    try {
        if (!levelId) return levelEnumMapping[ELevel.Base];
        return levelEnumMapping[levelId as ELevel];
    }
    catch {
        return levelEnumMapping[ELevel.Base];
    }
}
export const countryFlags = {
    [TypeCountry.Manga]: 'flag-icon flag-icon-jp flag-icon-squared',
    [TypeCountry.Manhwa]: 'flag-icon flag-icon-kr flag-icon-squared',
    [TypeCountry.Manhua]: 'flag-icon flag-icon-cn flag-icon-squared',
    [TypeCountry.Comic]: 'flag-icon flag-icon-us flag-icon-squared',
    [TypeCountry.BandeDessinée]: 'flag-icon flag-icon-fr flag-icon-squared',
};
export const affiliateLinks = [
    "https://s.shopee.vn/8pSjbUQ5QA",
    "https://s.shopee.vn/2AvpfI9ltF",
    "https://s.shopee.vn/2qBWSYXARs",
    "https://s.shopee.vn/3q43eQxUKe",
    "https://shope.ee/8UmLHVAopb",
    "https://shope.ee/4KwmK192Rk",
    "https://shope.ee/9zb94dHg92",
    "https://shope.ee/2LBlVwsK1Z",
    "https://shope.ee/50CWgZy2j4",
    "https://shope.ee/3q0VjefLHy"
];

export const percentAff = (role: any) => {
    if (role == ERoleType.User || role === ERoleType.NoneRole)
        return Math.random() <= 0.13;
    if (role == ERoleType.UserPremium)
        return Math.random() <= 0.03;
    if (role == ERoleType.UserSuperPremium)
        return false;
}

export const percentAffImage = (role: any) => {
    if (role == ERoleType.User || role === ERoleType.NoneRole)
        return Math.random() <= 1;
    if (role == ERoleType.UserPremium)
        return Math.random() <= 0.1;
    if (role == ERoleType.UserSuperPremium)
        return false;
}

export const generateAffiliateLink = (affiliateLinks: any) => {
    const randomIndex = Math.floor(Math.random() * affiliateLinks.length);
    return affiliateLinks[randomIndex];
}


export const generateRandomProduct = () : Product => {
    const randomIndex = Math.floor(Math.random() * productList.length);
    const randomProduct = productList[randomIndex];
    return randomProduct;
}

export const handleRedirect = (link: any, roleUser: any) => {
    if (percentAff(roleUser))
        window.open(generateAffiliateLink(affiliateLinks), '_blank');
    else {
        setHistory(link);
        window.location.href = link;
    }
}

export const setHistory = (link: any) => {
    const pattern = /\/([a-zA-Z0-9-]+)\/(chap-[0-9]+)$/;
    const match = link.match(pattern);

    if (match && match.length > 2) {
        const albumName = match[1];
        const chap = match[2];

        const existingHistoryJSON = localStorage.getItem("history_chap");
        const existingHistory: any[] = existingHistoryJSON ? (parseJsonFromString(existingHistoryJSON) ?? []) : [];
        const itemExists = existingHistory?.some((item: any) => item.albumName === albumName && item.chap === chap);

        if (!itemExists) {
            existingHistory.push({ albumName, chap });
            localStorage.setItem("history_chap", JSON.stringify(existingHistory));
        }
    }
}


export const shortNumberViews = (number: any) => {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1000000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (number < 1000000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else {
        return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
}

export const trackingIpV4 = async () => {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
}

export const imageLevel = (levelType: ELevel): string => {
    if (levelType === ELevel.Base || levelType === null) return "/assets/media/icon/base.png";
    if (levelType === ELevel.SSJ1) return "/assets/media/icon/ssj1.png";
    if (levelType === ELevel.SSJ2) return "/assets/media/icon/ssj2.png";
    if (levelType === ELevel.SSJ3) return "/assets/media/icon/ssj3.png";
    if (levelType === ELevel.GOD) return "/assets/media/icon/god.png";
    if (levelType === ELevel.BLUE) return "/assets/media/icon/blue.png";
    if (levelType === ELevel.UI) return "/assets/media/icon/ui.png";
    if (levelType === ELevel.MUI) return "/assets/media/icon/mui.png";
    if (levelType === ELevel.SAMA) return "/assets/media/icon/sama.png";
    if (levelType === ELevel.WHIS) return "/assets/media/icon/whis.png";
    if (levelType === ELevel.DAIS) return "/assets/media/icon/dais.png";
    if (levelType === ELevel.ZENO) return "/assets/media/icon/zeno.png";
    return "/assets/media/icon/base.png";
};

export const getLangByLocale = (locale: string) => {
    if (locale === "en") return "en";
    return "vi";
}

export const getRegionByLocale = (locale: string) => {
    if (locale === "en") return ERegion.en;
    return ERegion.vn;
}

export const converPrefixtUrlByLocale = (pathname: string, locale: string) => {
    if (locale === "en") {
        return "/en/" + pathname;
    }
    return pathname;
}

export const generateImageUrlByStorageType = (storageType: EStorageType, relativeUrl: string | null) => {
    switch (storageType) {
        case EStorageType.S1:
        default:
            return `${process.env.storageS1}/${relativeUrl}`;
    }
}

export const getDayjsByLocale = (locale: string, date?: Date | string | null) => {
    if (locale === 'vi') {
        return date ? dayjs.utc(date).add(7, 'hours') : dayjs().utc().add(7, 'hours');
    }

    return date ? dayjs.utc(date) : dayjs().utc();
}

export const roundTimeTo30Minutes = (date: any) => {
    let roundedDate = new Date(date);

    let minutes = roundedDate.getMinutes();
    if (minutes < 30) {
        roundedDate.setMinutes(30);
    } else if (minutes > 30) {
        roundedDate.setMinutes(0);
        roundedDate.setHours(roundedDate.getHours() + 1);
    } else {

    }

    return roundedDate;
}

export const percentBanner = (role: any) => {
    if (role == ERoleType.User || role === ERoleType.NoneRole)
        return true;
    if (role == ERoleType.UserPremium || role == ERoleType.UserSuperPremium)
        return false;
}