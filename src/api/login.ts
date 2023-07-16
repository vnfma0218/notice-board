import { PagingParamsType, PagingResponseType } from '@/lib/types';
import { IPost } from '@/lib/types/post';
import axiosInstance from './index';

interface UserResponse {
  email: string;
  password: string;
}
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
    return error.response.data;
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
    return error.response.data;
  }
};
// 로그아웃
export const logout = async () => {
  try {
    const res = await axiosInstance({
      url: '/user/logout',
      method: 'get',
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
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
    return error.response.data;
  }
};
