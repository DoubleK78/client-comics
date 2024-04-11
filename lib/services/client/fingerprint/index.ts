import axios from "axios";
import { identityServer } from "../baseUrl";

export const prepareGetFingerprint = async (fingerprint: string) => {
    try {
        const response = await axios.get<boolean | null>('/api/user/prepare', {
            baseURL: identityServer,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                code: fingerprint
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

export const registerFingerprint = async (fingerprint: string, additionalDetail: string | null) => {
    try {
        const response = await axios.post('/api/user/prepare', {
            code: fingerprint,
            info: additionalDetail
        }, {
            baseURL: identityServer,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}