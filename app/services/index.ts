import axios from "axios";

const axiosApiInstance = axios.create({
    withCredentials: true,
});

export default axiosApiInstance;