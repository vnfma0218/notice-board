import axiosInstance from './index';

// profile
export const getProfile = async () => {
  try {
    const res = await axiosInstance({
      url: '/user/profile',
      method: 'get',
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// update profile
export const updateProfile = async (data: any) => {
  try {
    const res = await axiosInstance({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      url: '/user/profile',
      method: 'put',
      withCredentials: true,
      data,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
