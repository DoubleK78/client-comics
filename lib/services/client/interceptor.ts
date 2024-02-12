import axios from "axios";

const axiosClientApiInstance = axios.create({});

axiosClientApiInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, error => {
    Promise.reject(error)
});

export default axiosClientApiInstance;