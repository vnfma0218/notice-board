import { PagingParamsType, PagingResponseType } from '@/lib/types';
import { IPost } from '@/lib/types/post';
import axiosInstance from './index';

interface PostResponse {
  id: string;
  message: string;
}
// 게시글 등록하기
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

// 게시글 전체목록
export const getPostList = async ({
  limit = 5,
  page = 1,
}: PagingParamsType): Promise<PagingResponseType<IPost[]>> => {
  try {
    const res = await axiosInstance<PagingResponseType<IPost[]>>({
      url: '/post',
      method: 'get',
      params: {
        limit,
        page,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// 게시글 상세
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
