import { IPost } from '@/lib/types/post';
import axiosInstance from './index';

interface PostResponse {
  id: string;
  message: string;
}

export const savePost = async (data: any): Promise<PostResponse> => {
  try {
    const res = await axiosInstance<PostResponse>({
      url: '/post/new',
      method: 'post',
      data,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getPostDetail = async (id: string): Promise<IPost> => {
  try {
    const res = await axiosInstance<IPost>({
      url: `/post/${id}`,
      method: 'get',
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
