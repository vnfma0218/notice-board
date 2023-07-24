export default {};
// import { useEffect } from 'react';
// import { axiosInstance } from '../api/index';

// const usePrivateAxios = () => {
//   const { accessToken } = useAppSelector(authState);
//   const refresh = useRefreshToken();

//   useEffect(() => {
//     // const requrestIntercept = privateAxios.interceptors.request.use();

//     const responseIntercept = axiosInstance.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 403 && !prevRequest?.sent) {
//           // console.log(error);
//           // prevRequest.sent = true;
//           // const newAccessToken = await refresh();
//           // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//           return axiosInstance(prevRequest);
//         }
//         // console.log(e  rror);
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       // axiosInstance.interceptors.request.eject(requrestIntercept);
//       axiosInstance.interceptors.response.eject(responseIntercept);
//     };
//   }, []);

//   return privateAxios;
// };
// export default usePrivateAxios;
