'use client';
import LoginPopup from './LoginPopup';
import Link from 'next/link';
import Avatar from './Avatar';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const login = () => {
    router.push('/login');
  };
  const checkSession = () => {
    console.log('session 체크');
  };
  return (
    <header className="flex justify-between items-center px-10 py-5 max-w-5xl m-auto">
      <p className="text-gray-700 font-bold text-xl">Welcome!</p>
      <nav>
        <ul className="flex items-center ">
          <li
            className="mr-5 cursor-pointer hover:text-blue-400"
            onClick={checkSession}
          >
            <Link href="/test">테스트페이지</Link>
          </li>
          <li className="mr-5 cursor-pointer hover:text-blue-400">
            <Link href="/board">게시판</Link>
          </li>

          {/* {session?.user?.email ? (
            <Avatar name={session?.user?.name ?? ''} />
          ) : (
            <button className="btn btn-sm	 btn-outline btn-info" onClick={login}>
              로그인
            </button>
          )} */}
          <button className="btn btn-sm	 btn-outline btn-info" onClick={login}>
            로그인
          </button>
        </ul>
      </nav>
      <LoginPopup />
    </header>
  );
};

export default Header;
