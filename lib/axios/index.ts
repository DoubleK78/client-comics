import axios, { CreateAxiosDefaults } from "axios";
import * as AxiosLogger from 'axios-logger';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { ERoleType } from "@/app/models/enums/ERoleType";

AxiosLogger.setGlobalConfig({
    dateFormat: 'yyyy-mm-dd HH:MM:ss',
    status: true,
    statusText: true,
    params: true
});

const getAxiosInstance = (baseURL?: string, token?: string | null) => {
    const config: CreateAxiosDefaults<any> | undefined = {
        baseURL
    };

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    const axiosApiInstance = axios.create(config);

    if (process.env.ENVIRONMENT?.toLowerCase() === 'local') {
        axiosApiInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
        axiosApiInstance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
    }

    return axiosApiInstance;
}

const getAxiosInstanceAsync = async () => {
    const session = await getServerSession(authOptions);

    const roleType = getEnumValueFromString(session?.user?.token?.roles);
    const token = session?.user?.token?.apiToken;

    const config: CreateAxiosDefaults<any> | undefined = {
        baseURL: roleType === ERoleType.UserPremium || roleType === ERoleType.UserSuperPremium ? process.env.PORTAL_PRE_API_URL : process.env.PORTAL_API_URL
    };

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    const axiosApiInstance = axios.create(config);

    if (process.env.ENVIRONMENT?.toLowerCase() === 'local') {
        axiosApiInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
        axiosApiInstance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
    }

    return axiosApiInstance;
}

export {
    getAxiosInstanceAsync
}

export default getAxiosInstance;
