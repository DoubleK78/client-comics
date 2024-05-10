import UserSession from "@/app/models/auth/UserSession";
import { ERoleType } from "@/app/models/enums/ERoleType";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { parseJsonFromString } from "@/lib/json";
import axios from "axios";
import { portalServer, prePortalServer } from "./baseUrl";

const axiosClientApiInstance = axios.create({
});

axiosClientApiInstance.interceptors.request.use((req) => {
    const session = localStorage.getItem('userSession');
    const userSession: UserSession | null = parseJsonFromString(session);
    const roleType = getEnumValueFromString(userSession?.roles);
    const baseUrl = roleType === ERoleType.UserPremium || roleType === ERoleType.UserSuperPremium ? prePortalServer! : portalServer!;
    req.url = req.url?.replace(req.baseURL ?? '', baseUrl);
    req.baseURL = baseUrl;

    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, error => {
    Promise.reject(error)
});

export default axiosClientApiInstance;