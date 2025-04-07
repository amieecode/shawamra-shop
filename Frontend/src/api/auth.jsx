import api from "../axios";


api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});


// API calls
export const registerUser = async(userData) => {
    const response = await api.post("/auth/register/", userData);
    return response.data;
};

export const loginUser = async (credential) => {
    const response  = await api.post("/auth/login/", credential);
    return response.data;
};

export const logoutUSer = async () => {
    const response = await api.post("/auth/logout/");
    return response.data;
};

export const fetchUserProfile = async () => {
    const response = await api.get("/auth/profile");
    return response.data;
};

export const updateUserProfile = async (data) => {
    const response = await api.put("/auth/profile/update/", data);
    return response.data;
};