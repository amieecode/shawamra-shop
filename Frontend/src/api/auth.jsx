import api from "../axios";

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");

    if (token && !config.headers['Skip-Auth']) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});



// API calls
export const registerUser = async (formData) => {
  try {
    const response = await api.post('/auth/register/', formData, {
      headers: { 'Skip-Auth': 'true' } // no token needed on register
    });
    return response.data;
  } catch (error) {
    // axios errors have a response object
    if (error.response) {
      const err = new Error('Registration Failed');
      err.response = error.response.data;
      throw err;
    }
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await api.post('/auth/login/', formData, {
      headers: { 'Skip-Auth': 'true' } // no token needed on login
    });
    return response.data;  // expects { token: "..." }
  } catch (error) {
    if (error.response) {
      const err = new Error('Login failed');
      err.response = error.response.data;
      throw err;
    }
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout/");
    return response.data;
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/auth/profile/update/", profileData);
    return response.data;
  } catch (error) {
    throw new Error('Profile update failed');
  }
};



