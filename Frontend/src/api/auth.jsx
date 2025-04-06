import api from "../axios";

export const loginUser = async (credential) => {
    const response  = await api.post("/auth/login/", credential);
    return response.data;
};

export const registerUser = async(useinfo) => {
    const response = await api.post("/auth/register/", useinfo);
    return response.data;
};