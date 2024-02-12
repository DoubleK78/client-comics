// helperFunctions.tsx

import React from 'react';
import { ERoleType } from '../models/common/ERoleType';
import FollowingRequestModel from '../models/comics/FollowingRequestModel';
import axiosClientApiInstance from '@/lib/services/client/interceptor';
import ServerResponse from '../models/common/ServerResponse';
import { portalServer } from '@/lib/services/client/baseUrl';
import { ELevel, levelEnumMapping } from '../models/enums/ELevel';

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
    if (roleType === ERoleType.UserSuperPremium) return <span className="s-premium-badge">S-Premium</span>;
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
    if (roleType === ERoleType.UserSuperPremium) return "s-glitter-text";
    if (roleType === ERoleType.UserPremium) return "glitter-text";
    return "";
};

export const getHoverTextValue = (roleType: any): string => {
    if (roleType === ERoleType.UserSuperPremium) return "78%";
    if (roleType === ERoleType.UserPremium) return "75%";
    if (roleType === ERoleType.User) return "70%";
    return "";
};

export const getEnumValueFromString = (roleString: any): ERoleType | undefined => {
    switch (roleString) {
        case "User":
            return ERoleType.User;
        case "Partner":
            return ERoleType.Partner;
        case "Administrator":
            return ERoleType.Administrator;
        case "User Premium":
            return ERoleType.UserPremium;
        case "User Super Premium":
            return ERoleType.UserSuperPremium;
        default:
            return undefined;
    }
}

export const followAlbum = async (requestModel: FollowingRequestModel) => {
    try {
        const response = await axiosClientApiInstance.post<ServerResponse<any>>(portalServer + '/api/following', requestModel);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const getStatusFollow = async (requestModel: FollowingRequestModel) => {
    try {
        const response = await axiosClientApiInstance.get<ServerResponse<any>>(portalServer + '/api/following', {
            params: requestModel,
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
};

export const unFollow = async (requestModel: FollowingRequestModel) => {
    try {
        const response = await axiosClientApiInstance.delete<ServerResponse<any>>(portalServer + '/api/following', {
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