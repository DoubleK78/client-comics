import axios, { CreateAxiosDefaults } from "axios";
import * as AxiosLogger from 'axios-logger';

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

export default getAxiosInstance;
