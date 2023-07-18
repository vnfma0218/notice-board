import { PagingParamsType, PagingResponseType } from '@/lib/types';
import { IPost } from '@/lib/types/post';
import axiosInstance from './index';

interface PostResponse {
  id: string;
  message: string;
}
// 게시글 등록하기
export const savePost = async (data: {
  title: string;
  content: string;
}): Promise<PostResponse> => {
  try {
    const res = await axiosInstance<PostResponse>({
      url: '/post/new',
      method: 'post',
      data,
      withCredentials: true,
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
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
// 댓글 등록
export const postComment = async (data: { text: string; id: string }) => {
  try {
    const res = await axiosInstance<IPost>({
      url: `/post/comment`,
      method: 'post',
      withCredentials: true,
      data,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
// 댓글 삭제
export const deleteComment = async (commentId: string, postId: string) => {
  try {
    const res = await axiosInstance<IPost>({
      url: `/post/comment`,
      method: 'delete',
      withCredentials: true,
      data: {
        postId,
        commentId,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
// 댓글 삭제
export const updateComment = async (commentId: string, text: string) => {
  try {
    const res = await axiosInstance<IPost>({
      url: `/post/comment`,
      method: 'put',
      withCredentials: true,
      data: {
        commentId,
        text,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
