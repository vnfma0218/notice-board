'use client';
import useSWR from 'swr';
import LoginPopup from './LoginPopup';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { isLoggedIn } from '@/api/login';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoggedIn } from '@/redux/features/user/userSlice';
import Avatar from './Avatar';
import { useEffect } from 'react';

const Header = () => {
  const isLogin = useAppSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const login = () => {
    router.push('/signin');
  };

  useEffect(() => {
    isLoggedIn().then((res) => {
      if (res.isLoggedIn) {
        dispatch(setLoggedIn());
      }
    });
  }, []);

  return (
    <header className="flex justify-between items-center px-10 py-5 max-w-5xl m-auto">
      <p className="text-gray-700 font-bold text-xl">Welcome!</p>
      <nav>
        <ul className="flex items-center ">
          <li className="mr-5 cursor-pointer hover:text-blue-400">
            <Link href="/test">테스트페이지</Link>
          </li>
          <li className="mr-5 cursor-pointer hover:text-blue-400">
            <Link href="/board">게시판</Link>
          </li>

          {/* isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : */}

          {isLogin ? (
            <Avatar />
          ) : (
            <button className="btn btn-sm	 btn-outline btn-info" onClick={login}>
              로그인
            </button>
          )}
        </ul>
      </nav>
      <LoginPopup />
    </header>
  );
};

export default Header;
