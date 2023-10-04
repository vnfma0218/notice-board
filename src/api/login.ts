import axiosInstance from './index';

// 로그인
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axiosInstance({
      url: '/user/login',
      method: 'post',
      withCredentials: true,
      data: {
        email,
        password,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response;
  }
};
// 회원가입
export const signup = async ({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  try {
    const res = await axiosInstance({
      url: '/user/signup',
      method: 'post',
      data: {
        email,
        password,
        nickname,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response;
  }
};
// 로그아웃
export const logout = async () => {
  try {
    const res = await axiosInstance({
      url: '/user/logout',
      method: 'get',
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return error.response;
  }
};
export const isLoggedIn = async () => {
  try {
    const res = await axiosInstance({
      url: '/user/isLoggedIn',
      method: 'get',
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return error;
  }
};

// 토큰 재요청

export const refresh = async () => {
  try {
    const res = await axiosInstance({
      url: '/user/refresh',
      method: 'get',
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return error;
  }
};
