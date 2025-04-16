import api from "../axios";


api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");

    if (token && !config.headers['Skip-Auth']) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});


// API calls
export const registerUser = async (userData) => {
    const response = await api.post("/auth/register/", userData, {
        headers: { 'Skip-Auth': true },
    });
    return response.data;
};

export const loginUser = async (credential) => {
    const response = await api.post("/auth/login/", credential, {
        headers: { 'Skip-Auth': true }, // this skips adding Authorization header
    });
    return response.data;
};

export const logoutUSer = async () => {
    const response = await api.post("/auth/logout/");
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put("/auth/profile/update/", profileData);
    return response.data;
};


