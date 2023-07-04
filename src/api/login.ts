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
      url: '/login',
      method: 'post',
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
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axiosInstance({
      url: '/signup',
      method: 'post',
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
