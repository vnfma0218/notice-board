'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  console.log('session', session);
  const login = () => {
    signIn('kakao');
  };
  return (
    <header className="flex justify-between items-center px-10 py-5 max-w-5xl m-auto">
      <p>title</p>
      <nav>
        <ul className="flex items-center">
          <li className="mr-5 cursor-pointer hover:text-blue-400">메뉴1</li>
          <li className="mr-5 cursor-pointer hover:text-blue-400">메뉴2</li>
          {/* <li className="mr-5 cursor-pointer hover:text-blue-400">
            마이페이지
          </li> */}
          <button className="btn btn-sm	 btn-outline btn-info" onClick={login}>
            로그인
          </button>

          {/* <Avatar /> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
