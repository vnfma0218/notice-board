import axios from 'axios';
import { refresh } from './login';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 401) {
      console.log('토큰 재요청');
      refresh()
        .then(() => {
          return axiosInstance(error.config);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return error;
  }
);

export default axiosInstance;
