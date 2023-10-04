import axiosInstance from './index';

interface Activity {
  id: string;
  text: string;
  post: {
    id: string;
    title: string;
  };
  user: string;
  createdAt: string;
}
// 게시글 등록
export const getRecentActivities = async (): Promise<Activity[]> => {
  try {
    const res = await axiosInstance<Activity[]>({
      url: '/activities',
      method: 'get',
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
