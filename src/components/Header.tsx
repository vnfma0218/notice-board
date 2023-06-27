'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Avatar from './Avatar';

const Header = () => {
  const { data: session } = useSession();
  const login = () => {
    signIn('kakao');
  };
  console.log('session 체크', session);
  return (
    <header className="flex justify-between items-center px-10 py-5 max-w-5xl m-auto">
      <p>title</p>
      <nav>
        <ul className="flex items-center">
          <li className="mr-5 cursor-pointer hover:text-blue-400">메뉴1</li>
          <li className="mr-5 cursor-pointer hover:text-blue-400">
            <Link href={'/board'}>게시판</Link>
          </li>

          {session?.user?.name ? (
            <Avatar name={session?.user?.name} />
          ) : (
            <button className="btn btn-sm	 btn-outline btn-info" onClick={login}>
              로그인
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
