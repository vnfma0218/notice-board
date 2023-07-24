'use client';
import useSWR from 'swr';
import LoginPopup from './LoginPopup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    router.push('/login');
  };
  const showFullModal = () => {
    console.log('test');
  };
  return (
    <header className="flex justify-between items-center px-10 py-5 max-w-5xl m-auto">
      <p className="text-gray-700 font-bold text-xl">Welcome!</p>

      <div onClick={showFullModal} className="flex-none md:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <nav className="md:block hidden">
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
