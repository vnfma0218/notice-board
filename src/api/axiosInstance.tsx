import axios from 'axios';

export default function useAxios() {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
      // 응답 데이터가 있는 작업 수행
      return response;
    },
    function (error) {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
      // 응답 오류가 있는 작업 수행
      return error;
      // if (error.response && error.response.status) {
      // console.log('error', error);
      // switch (error.response.status) {
      //   // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
      //   case 403:
      //     console.log('hello');
      //     // store.commit('auth/logout');
      //     // router.push('/login');
      //     break;
      //   default:
      //     return Promise.reject(error);
      // }
      // }
    }
  );

  return axiosInstance;
}
