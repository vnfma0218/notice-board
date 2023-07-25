'use client';
import Image from 'next/image';

import MessageModal from '@/components/MessageModal';
import { usePathname } from 'next/navigation';
import UserInfo from '@/components/myPage/UserInfo';
import { useState } from 'react';
import Activities from '@/components/myPage/Activities';

export default function MyPage() {
  const [tab, setTab] = useState<'1' | '2'>('1');
  const pathname = usePathname();

  // if (data === 'Forbidden') {
  //   router.replace('/login');
  // }

  const onChangeTab = (tab: '1' | '2') => {
    setTab(tab);
  };

  return (
    <main className="flex flex-col md:flex md:flex-row m-auto px-4 md:px-20 mt-10">
      <section className="side-menu basis-1/3 h-screen min-w-[250px] pr-10">
        <div>
          <p className="text-2xl font-semibold">내 계정</p>
        </div>
        <ul className="mt-10">
          <li
            onClick={() => onChangeTab('1')}
            className={`${
              tab === '1' ? 'bg-slate-200' : null
            } flex items-center rounded-md p-3 hover:bg-slate-300 cursor-pointer`}
          >
            <span>
              <Image
                priority
                src="/images/user-circle.svg"
                height={25}
                width={25}
                alt="MoreButton"
              />
            </span>
            <span className="text-lg ml-3">회원정보</span>
          </li>
          <li
            onClick={() => onChangeTab('2')}
            className={`${
              tab === '2' ? 'bg-slate-200' : null
            } mt-3 flex items-center rounded-md p-3 hover:bg-slate-300 cursor-pointer`}
          >
            <span>
              <Image
                priority
                src="/images/user-circle.svg"
                height={25}
                width={25}
                alt="MoreButton"
              />
            </span>
            <span className="text-lg ml-3">활동내역</span>
          </li>
        </ul>
      </section>
      <div className="mt-3 border vertical md:block"></div>

      <section className={`${tab === '1' ? 'md:pl-20' : null} basis-2/3`}>
        {tab === '1' ? <UserInfo /> : <Activities />}
      </section>
      <MessageModal />
    </main>
  );
}
