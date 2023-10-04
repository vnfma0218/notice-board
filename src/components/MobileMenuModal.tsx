'use client';
import useSWR from 'swr';
import Avatar from './Avatar';
import { getProfile } from '@/api/user';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/redux/features/user/userSlice';
import { logout } from '@/api/login';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';

const authRoutes = ['/login', '/signup'];
const MobileMenuModal = () => {
  const pathName = usePathname();
  const [, , removeCookie] = useCookies(['token', 'refreshToken']);

  const { data, mutate } = useSWR(
    authRoutes.findIndex((el) => el === pathName) === -1 ? '/profile' : null,
    () => getProfile()
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const navigatePage = (url: string) => {
    closeBtnRef.current?.click();
    router.push(url);
  };
  return (
    <dialog id="mobile_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-screen h-screen min-w-[300px]"
      >
        <div className="flex justify-between items-center">
          <p className="text-xl">Welcome!</p>
          <div className="modal-action mt-0">
            {/* if there is a button, it will close the modal */}
            <button ref={closeBtnRef} className="btn cursor-pointer text-xl">
              X
            </button>
          </div>
        </div>

        <nav className="mt-10">
          <ul className="">
            <li
              onClick={() => navigatePage('/test')}
              className="cursor-pointer p-3 hover:text-blue-400  hover:bg-slate-300 rounded-md"
            >
              테스트 페이지
            </li>
            <li
              onClick={() => navigatePage('/board')}
              className="cursor-pointer p-3 hover:text-blue-400  hover:bg-slate-300 rounded-md"
            >
              게시판
            </li>
          </ul>
        </nav>
        <div className="divider"></div>
        {data?.nickname ? (
          <div className="flex items-center">
            <Avatar pageInfo="modal" />
            <div className="ml-3">
              <p>{data?.nickname}</p>
              <p className="text-gray-500">{data?.email}</p>
            </div>
          </div>
        ) : null}

        <div>
          {!data?.nickname ? (
            <li
              onClick={() => navigatePage('/login')}
              className="mt-5 list-none cursor-pointer p-3 hover:text-blue-400 mb-10 hover:bg-slate-300 rounded-md"
            >
              로그인
            </li>
          ) : (
            <>
              <li
                onClick={() => navigatePage('/myPage')}
                className="mt-5 list-none cursor-pointer p-3 hover:text-blue-400  hover:bg-slate-300 rounded-md"
              >
                마이페이지
              </li>
              <li
                onClick={() => {
                  dispatch(setLogout());
                  removeCookie('refreshToken', { path: '/' });
                  removeCookie('token', { path: '/' });
                  closeBtnRef.current?.click();
                  logout().then(() => {
                    mutate();
                    router.push('/login');
                  });
                }}
                className="list-none p-3 cursor-pointer hover:text-blue-400 mb-10 hover:bg-slate-300 rounded-md"
              >
                로그아웃
              </li>
            </>
          )}
        </div>
      </form>
    </dialog>
  );
};

export default MobileMenuModal;
